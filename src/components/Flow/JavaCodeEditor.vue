<script setup>
import { nextTick, onMounted, ref, watch } from "vue";

// ✅ Reactive Variables
const options = ref(window.javaCodeEditorOptions || { isJavaCodeEditor: false, value: "" });
const editor = ref(null);
const aceEditor = ref(null);
const compilerHeight = ref(200);
const isResizing = ref(false);
const isCompilerVisible = ref(false);

// ✅ Compile Handler
const handleCompile = () => {
    isCompilerVisible.value = true;
};

// ✅ Close Compiler
const closeCompiler = () => {
    isCompilerVisible.value = false;
};

// ✅ Resize Logic
const startResize = (event) => {
    isResizing.value = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
};

const resize = (event) => {
    if (isResizing.value) {
        const newHeight = window.innerHeight - event.clientY;
        compilerHeight.value = Math.max(100, Math.min(newHeight, 600));
    }
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
};

// ✅ Save Code Handler
const handleSave = () => {
    console.log("💾 Saving Code:", aceEditor.value?.getValue());
};

// ✅ Properly Close the Editor
const closeCodeEditor = () => {
    console.log(" Closing Code Editor");
    options.value.isJavaCodeEditor = false;
};

// ✅ Watch for changes in editor state
watch(
    () => options.value.isJavaCodeEditor,
    async (newVal) => {
        if (newVal) {
            await nextTick();
            initializeAceEditor();
        }
    }
);

// ✅ Load Ace Editor via CDN if not already loaded
const loadAceEditor = async () => {
    if (window.ace) return;

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/ace-builds@1.39.0/src-min-noconflict/ace.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

// ✅ Initialize Ace Editor
const initializeAceEditor = async () => {
    await nextTick();

    // if (!editor.value) {
    //     console.error("❌ Editor ref is still not available.");
    //     return;
    // }

    if (!window.ace) {
        console.error("❌ Ace Editor failed to load.");
        return;
    }
    window.ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.39.0/src-min-noconflict");

    // ✅ Destroy previous instance if exists
    if (aceEditor.value) {
        aceEditor.value.destroy();
        aceEditor.value = null;
    }

    // ✅ Create New Editor Instance
    aceEditor.value = window.ace.edit(editor.value);
    aceEditor.value.setTheme("ace/theme/chrome");
    aceEditor.value.session.setMode("ace/mode/java");
    aceEditor.value.setFontSize(14);
    aceEditor.value.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showPrintMargin: false,
        wrap: true,
    });

    // ✅ Load stored or default Java code
    const storedCode =
        localStorage.getItem("javaCode") ||
        `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`;
    aceEditor.value.setValue(storedCode, -1);

    // ✅ Auto-save without affecting cursor position
    aceEditor.value.session.on("change", () => {
        localStorage.setItem("javaCode", aceEditor.value.getValue());
    });
};

// ✅ Lifecycle Hook: Load Ace & Initialize
onMounted(async () => {
    await loadAceEditor();
    initializeAceEditor();
});
</script>

<template>
    <div v-if="options.isJavaCodeEditor" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-[9999]">
        <div class="flex flex-col gap-2 bg-white rounded-xl border border-slate-200 w-full max-w-5xl max-h-[90vh] h-full p-2">
            <!-- Header -->
            <div class="flex items-center gap-2">
                <p class="text-sm font-medium">Java Code Editor</p>
                <button @click="handleCompile" class="ml-auto px-4 h-8 rounded-md bg-slate-900 text-white font-medium hover:shadow-lg transition-all">Compile</button>
                <button @click="handleSave" class="px-4 h-8 rounded-md bg-slate-900 text-white font-medium hover:shadow-lg transition-all">Save</button>
                <button @click="closeCodeEditor()" class="size-8 rounded-md border border-slate-200 font-medium hover:shadow-lg transition-all">
                    <span class="text-base flex items-center justify-center">
                        <i class="hgi hgi-stroke hgi-cancel-01"></i>
                    </span>
                </button>
            </div>
            <hr />

            <!-- Ace Editor Container -->
            <div class="w-full max-w-full h-full overflow-hidden flex flex-col">
                <!-- Existing Code Below -->
                <div class="flex-1 border border-slate-200 rounded-md relative w-full min-h-[300px] flex flex-col">
                    <!-- Ace Editor -->
                    <div ref="editor" class="w-full h-full min-h-[200px] max-h-[90vh] overflow-auto rounded-md"></div>

                    <!-- Compiler Output Section (Resizable) -->
                    <div
                        v-if="isCompilerVisible"
                        :style="{ height: compilerHeight + 'px' }"
                        class="bg-slate-900 text-white border border-slate-200 rounded-md w-full max-h-[50vh] min-h-[100px] relative">
                        <!-- Resize Handle -->
                        <div @mousedown="startResize" class="absolute top-0 left-0 w-full h-1 cursor-ns-resize"></div>

                        <!-- Compiler Header -->
                        <div class="p-2 flex justify-between items-center">
                            <p class="text-sm font-medium flex items-center justify-center gap-2">
                                <span class="text-base"><i class="hgi hgi-stroke hgi-sharp hgi-arrow-right-01"></i></span> Output
                            </p>
                            <button @click="closeCompiler" type="button" class="size-8 text-sm font-medium rounded-md text-white hover:border transition-all border-slate-200">
                                <span class="text-base flex items-center justify-center">
                                    <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                </span>
                            </button>
                        </div>
                        <hr />
                        <div class="p-2 text-sm text-gray-300">Compiler Output will appear here</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
