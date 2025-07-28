import { App, defineComponent, DefineComponent, VNode } from 'vue';

interface BreakpointConfig {
  breakpoint?: string;
  size?: number;
}

interface PanelConfig {
  sections?: any;
  separators?: any;
  props?: object;
}

interface ElementPanelConfig {
  types?: any;
  props?: object;
}

interface BuilderConfig {
  search?: boolean;
  views?: ('editor' | 'preview' | 'code')[];
  devices?: ('tablet' | 'desktop')[];
  breakpoints?: {
    tablet?: BreakpointConfig;
    desktop?: BreakpointConfig;
  };
  darkMode?: ('light' | 'dark')[];
  toggleLeft?: boolean;
  toggleRight?: boolean;
  clear?: boolean;
  save?: boolean;
  undo?: boolean;
  modelPreview?: boolean;
  leftPanel?: ('elements' | 'tree' | 'form' | 'theme' | 'export' | 'settings' | 'model')[];
  rightPanel?: ('elements' | 'tree' | 'form' | 'theme' | 'export' | 'settings' | 'model')[];
  leftLayout?: 'tabs' | 'icons';
  rightLayout?: 'tabs' | 'icons';
  defaultWidth?: number;
  defaultLocale?: string;
  fallbackLocale?: string;
  locales?: object;
  emojiFlags?: boolean;
  delay?: number;
  storagePrefix?: string | null;
  defaultName?: string;
  autosave?: number;
  history?: boolean;
  maxHistory?: number;
  longFieldNames?: boolean;
  infos?: boolean;
  columns?: {
    container?: number;
    label?: number;
    wrapper?: number;
  };
  themes?: object;
  categories?: object;
  export?: PanelConfig;
  form?: PanelConfig;
  theme?: PanelConfig;
  tab?: PanelConfig;
  step?: PanelConfig;
  element?: ElementPanelConfig;
  elements?: string[];
  excludeElements?: string[];
  preset?: BuilderConfig;
  names?: boolean;
  transformElement?: boolean | function;
  formDefaults?: object;
  [key: string]: any;
}

declare module '@vueform/builder' {
  const elementTypes: any;
  const sections: any;
  const separators: any;
  const themes: any;
  const defineConfig: any;
  const AcceptField: any;
  const AcceptImagesField: any;
  const AddonsField: any;
  const AddTextField: any;
  const AfterField: any;
  const AlignField: any;
  const AlignField_toggle: any;
  const AlignField_checkbox: any;
  const AlignField_radio: any;
  const AllowExpressionsField: any;
  const AttrsField: any;
  const AttrsField_static: any;
  const AutocompleteField: any;
  const AutogrowField: any;
  const AutoloadField: any;
  const AutoUploadField: any;
  const BaseCellField: any;
  const BaseElementField: any;
  const BaseExportField: any;
  const BaseField: any;
  const BaseFormField: any;
  const BaseMultilingualElementField: any;
  const BaseMultilingualFormField: any;
  const BasePageField: any;
  const BaseSelectOptionField: any;
  const BaseThemeField: any;
  const BeforeField: any;
  const BetweenField: any;
  const BoolValueField: any;
  const ButtonLabelField: any;
  const ButtonTypeField: any;
  const CanAddField: any;
  const CanClearField: any;
  const CanDropField: any;
  const CanRemoveField: any;
  const CanUndoField: any;
  const CellAlignField: any;
  const CellValignField: any;
  const ClickableField: any;
  const ColHeaderField: any;
  const ColorsField: any;
  const ColumnsField: any;
  const ColWrapField: any;
  const ConditionsField: any;
  const ContentField: any;
  const ControlsField: any;
  const CreateField: any;
  const DateRestrictionsField: any;
  const DateFormatField: any;
  const DateModeField: any;
  const DefaultField: any;
  const DefaultField_location: any;
  const DefaultField_select: any;
  const DefaultField_multiselect: any;
  const DefaultField_tags: any;
  const DefaultField_radiogroup: any;
  const DefaultField_checkboxgroup: any;
  const DefaultField_date: any;
  const DefaultField_time: any;
  const DefaultField_datetime: any;
  const DefaultField_dates: any;
  const DefaultField_slider: any;
  const DefaultField_toggle: any;
  const DefaultField_checkbox: any;
  const DefaultField_radio: any;
  const DefaultField_editor: any;
  const DefaultField_textarea: any;
  const DefaultField_list: any;
  const DefaultField_multilingual: any;
  const DescriptionField: any;
  const DirectionField: any;
  const DisabledField: any;
  const DragAndDropField: any;
  const EndpointField: any;
  const ExcludeCountriesField: any;
  const ExportApiField: any;
  const ExportDownloadField: any;
  const ExportOutputField: any;
  const ExportThemeField: any;
  const ExpressionField: any;
  const FieldNameField: any;
  const FileAcceptField: any;
  const FileEndpointsField: any;
  const FileRulesField: any;
  const FileUrlsField: any;
  const FontsField: any;
  const ForceNumbersField: any;
  const FormColumnsField: any;
  const FormDisplayErrorsField: any;
  const FormDisplayMessagesField: any;
  const FormEndpointField: any;
  const FormFloatPlaceholderField: any;
  const FormForceLabelsField: any;
  const FormFormKeyField: any;
  const FormNameField: any;
  const FormNestingField: any;
  const FormSizeField: any;
  const FormValidationField: any;
  const FormWidthField: any;
  const FullField: any;
  const GridField: any;
  const HeightField: any;
  const HideColsField: any;
  const HideRowsField: any;
  const Hour24Field: any;
  const HrefField: any;
  const IdField: any;
  const ImgField: any;
  const IncludeCountriesField: any;
  const InfoField: any;
  const InitialField: any;
  const InputTypeField: any;
  const InvertColorsField: any;
  const ItemsField: any;
  const LabelField: any;
  const LabelsField: any;
  const LineField: any;
  const LinkField: any;
  const MatrixColsField: any;
  const MatrixGapField: any;
  const MatrixInputTypeField: any;
  const MatrixItemsField: any;
  const MatrixMaxField: any;
  const MatrixMaxWidthField: any;
  const MatrixMinField: any;
  const MatrixMinWidthField: any;
  const MatrixRowsField: any;
  const MaxField: any;
  const MaxFontSizeField: any;
  const MaxOptionsField: any;
  const MaxSizeField: any;
  const MaxWidthField: any;
  const MaxWidthField_grid: any;
  const MetaField: any;
  const MinField: any;
  const MinFontSizeField: any;
  const MinWidthField_grid: any;
  const ModesField: any;
  const MultipleLabelField: any;
  const NameField: any;
  const NativeField: any;
  const NestedField: any;
  const NoOptionsField: any;
  const NoResultsField: any;
  const ObjectField: any;
  const OrientationField: any;
  const PaddingField: any;
  const PageButtonsField: any;
  const PageConditionsField: any;
  const PageLabelField: any;
  const PageLabelsField: any;
  const ParamsField: any;
  const PlaceholderField: any;
  const PlaceholderField_signature: any;
  const RadioField: any;
  const ReadonlyField: any;
  const ResetsField: any;
  const RowHeaderField: any;
  const RowsField: any;
  const RowWrapField: any;
  const ScrollableField: any;
  const SearchField: any;
  const SearchField_tags: any;
  const SecondsField: any;
  const SelectBehaviorField: any;
  const SelectBehaviorField_tags: any;
  const SelectBehaviorField_multiselect: any;
  const SelectItemsField: any;
  const SelectUiField: any;
  const SizeField: any;
  const SoftRemoveField: any;
  const SpaceField: any;
  const StepField: any;
  const StickyColsField: any;
  const StickyRowsField: any;
  const StoreField: any;
  const StoreOrderField: any;
  const SubmitField: any;
  const SubmitsField: any;
  const SubtitleField: any;
  const TagField: any;
  const TargetField: any;
  const TextField: any;
  const ThemeBorderField: any;
  const ThemeColorField: any;
  const ThemeColorSelectorField: any;
  const ThemeRadiusField: any;
  const ThemeSelectField: any;
  const ThemeShadowField: any;
  const ThemeSingleSizeField: any;
  const ThemeSizeField: any;
  const ThemeThemeField: any;
  const ThemeToolsField: any;
  const ThemeToolsHiddenField: any;
  const TitleSignatureDrawField: any;
  const TitleSignatureTypeField: any;
  const TitleSignatureUploadField: any;
  const ToolsField: any;
  const TooltipFormatField: any;
  const TooltipsField: any;
  const TypeField: any;
  const UnmaskField: any;
  const UploadHeightField: any;
  const UploadWidthField: any;
  const ValidationField: any;
  const ViewField: any;
  const ViewField_file: any;
  const ViewField_matrix: any;
  const ViewField_grid: any;

  function defineConfig(options: BuilderConfig): BuilderConfig;

  export {
    elementTypes,
    sections,
    separators,
    themes,
    defineConfig,
    AcceptField,
    AcceptImagesField,
    AddonsField,
    AddTextField,
    AfterField,
    AlignField,
    AlignField_toggle,
    AlignField_checkbox,
    AlignField_radio,
    AllowExpressionsField,
    AttrsField,
    AttrsField_static,
    AutocompleteField,
    AutogrowField,
    AutoloadField,
    AutoUploadField,
    BaseCellField,
    BaseElementField,
    BaseExportField,
    BaseField,
    BaseFormField,
    BaseMultilingualElementField,
    BaseMultilingualFormField,
    BasePageField,
    BaseSelectOptionField,
    BaseThemeField,
    BeforeField,
    BetweenField,
    BoolValueField,
    ButtonLabelField,
    ButtonTypeField,
    CanAddField,
    CanClearField,
    CanDropField,
    CanRemoveField,
    CanUndoField,
    CellAlignField,
    CellValignField,
    ClickableField,
    ColHeaderField,
    ColorsField,
    ColumnsField,
    ColWrapField,
    ConditionsField,
    ContentField,
    ControlsField,
    CreateField,
    DateRestrictionsField,
    DateFormatField,
    DateModeField,
    DefaultField,
    DefaultField_location,
    DefaultField_select,
    DefaultField_multiselect,
    DefaultField_tags,
    DefaultField_radiogroup,
    DefaultField_checkboxgroup,
    DefaultField_date,
    DefaultField_time,
    DefaultField_datetime,
    DefaultField_dates,
    DefaultField_slider,
    DefaultField_toggle,
    DefaultField_checkbox,
    DefaultField_radio,
    DefaultField_editor,
    DefaultField_textarea,
    DefaultField_list,
    DefaultField_multilingual,
    DescriptionField,
    DirectionField,
    DisabledField,
    DragAndDropField,
    EndpointField,
    ExcludeCountriesField,
    ExportApiField,
    ExportDownloadField,
    ExportOutputField,
    ExportThemeField,
    ExpressionField,
    FieldNameField,
    FileAcceptField,
    FileEndpointsField,
    FileRulesField,
    FileUrlsField,
    FontsField,
    ForceNumbersField,
    FormColumnsField,
    FormDisplayErrorsField,
    FormDisplayMessagesField,
    FormEndpointField,
    FormFloatPlaceholderField,
    FormForceLabelsField,
    FormFormKeyField,
    FormNameField,
    FormNestingField,
    FormSizeField,
    FormValidationField,
    FormWidthField,
    FullField,
    GridField,
    HeightField,
    HideColsField,
    HideRowsField,
    Hour24Field,
    HrefField,
    IdField,
    ImgField,
    IncludeCountriesField,
    InfoField,
    InitialField,
    InputTypeField,
    InvertColorsField,
    ItemsField,
    LabelField,
    LabelsField,
    LineField,
    LinkField,
    MatrixColsField,
    MatrixGapField,
    MatrixInputTypeField,
    MatrixItemsField,
    MatrixMaxField,
    MatrixMaxWidthField,
    MatrixMinField,
    MatrixMinWidthField,
    MatrixRowsField,
    MaxField,
    MaxFontSizeField,
    MaxOptionsField,
    MaxSizeField,
    MaxWidthField,
    MaxWidthField_grid,
    MetaField,
    MinField,
    MinFontSizeField,
    MinWidthField_grid,
    ModesField,
    MultipleLabelField,
    NameField,
    NativeField,
    NestedField,
    NoOptionsField,
    NoResultsField,
    ObjectField,
    OrientationField,
    PaddingField,
    PageButtonsField,
    PageConditionsField,
    PageLabelField,
    PageLabelsField,
    ParamsField,
    PlaceholderField,
    PlaceholderField_signature,
    RadioField,
    ReadonlyField,
    ResetsField,
    RowHeaderField,
    RowsField,
    RowWrapField,
    ScrollableField,
    SearchField,
    SearchField_tags,
    SecondsField,
    SelectBehaviorField,
    SelectBehaviorField_tags,
    SelectBehaviorField_multiselect,
    SelectItemsField,
    SelectUiField,
    SizeField,
    SoftRemoveField,
    SpaceField,
    StepField,
    StickyColsField,
    StickyRowsField,
    StoreField,
    StoreOrderField,
    SubmitField,
    SubmitsField,
    SubtitleField,
    TagField,
    TargetField,
    TextField,
    ThemeBorderField,
    ThemeColorField,
    ThemeColorSelectorField,
    ThemeRadiusField,
    ThemeSelectField,
    ThemeShadowField,
    ThemeSingleSizeField,
    ThemeSizeField,
    ThemeThemeField,
    ThemeToolsField,
    ThemeToolsHiddenField,
    TitleSignatureDrawField,
    TitleSignatureTypeField,
    TitleSignatureUploadField,
    ToolsField,
    TooltipFormatField,
    TooltipsField,
    TypeField,
    UnmaskField,
    UploadHeightField,
    UploadWidthField,
    ValidationField,
    ViewField,
    ViewField_file,
    ViewField_matrix,
    ViewField_grid,

  }

  export default function install(app?: any, options: BuilderConfig): any;
}