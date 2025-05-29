import webDriver from "../components/Blocks/Common/webDriver.vue";
import JavaCode from "/src/components/Blocks/AnalysisFlow/JavaCode.vue";
import Processor from "/src/components/Blocks/AnalysisFlow/Processor.vue";
import AiRequest from "/src/components/Blocks/Common/AiRequest.vue";
import BooleanBlock from "/src/components/Blocks/Common/BooleanBlock.vue";
import CollectBlock from "/src/components/Blocks/Common/CollectBlock.vue";
import ConditionBlock from "/src/components/Blocks/Common/ConditionBlock.vue";
import CreateVariableBlock from "/src/components/Blocks/Common/CreateVariableBlock.vue";
import DateBlock from "/src/components/Blocks/Common/DateBlock.vue";
import DateTimeBlock from "/src/components/Blocks/Common/DateTimeBlock.vue";
import DelayBlock from "/src/components/Blocks/Common/DelayBlock.vue";
import DisplayBlock from "/src/components/Blocks/Common/DisplayBlock.vue";
import DynamicBlock from "/src/components/Blocks/Common/DynamicBlock.vue";
import EvaluateBlock from "/src/components/Blocks/Common/EvaluateBlock.vue";
import FlowBlock from "/src/components/Blocks/Common/FlowBlock.vue";
import ForBlock from "/src/components/Blocks/Common/ForBlock.vue";
import GetVariable from "/src/components/Blocks/Common/GetVariable.vue";
import HttpRequestBlock from "/src/components/Blocks/Common/HttpRequestBlock.vue";
import IfBlock from "/src/components/Blocks/Common/IfBlock.vue";
import InputBlock from "/src/components/Blocks/Common/InputBlock.vue";
import JsonBlock from "/src/components/Blocks/Common/JsonBlock.vue";
import LogBlock from "/src/components/Blocks/Common/LogBlock.vue";
import NowBlock from "/src/components/Blocks/Common/NowBlock.vue";
import NullBlock from "/src/components/Blocks/Common/NullBlock.vue";
import NumberBlock from "/src/components/Blocks/Common/NumberBlock.vue";
import OutputBlock from "/src/components/Blocks/Common/OutputBlock.vue";
import Repeat from "/src/components/Blocks/Common/Repeat.vue";
import SelectBlock from "/src/components/Blocks/Common/SelectBlock.vue";
import StringBlock from "/src/components/Blocks/Common/StringBlock.vue";
import TemplateBlock from "/src/components/Blocks/Common/TemplateBlock.vue";
import ValidateBlock from "/src/components/Blocks/Common/ValidateBlock.vue";

export default {
    in: InputBlock,
    out: OutputBlock,
    condition: ConditionBlock,
    if: IfBlock,
    evaluate: EvaluateBlock,
    delay: DelayBlock,
    repeat: Repeat,
    for: ForBlock,
    collect: CollectBlock,
    display: DisplayBlock,
    log: LogBlock,
    string: StringBlock,
    boolean: BooleanBlock,
    number: NumberBlock,
    null: NullBlock,
    select: SelectBlock,
    now: NowBlock,
    date: DateBlock,
    dateTime: DateTimeBlock,
    template: TemplateBlock,
    httpRequest: HttpRequestBlock,
    create: CreateVariableBlock,
    getVariable: GetVariable,
    aiRequest: AiRequest,
    json: JsonBlock,
    dynamic: DynamicBlock,
    flow: FlowBlock,
    processor: Processor,
    validate: ValidateBlock,
    javaCode: JavaCode,
    web: webDriver,
};
