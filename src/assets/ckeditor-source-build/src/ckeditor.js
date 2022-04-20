/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Comments from '@ckeditor/ckeditor5-comments/src/comments.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';

import SimpleBox from '../customPlugins/simplebox/simplebox'
import Placeholder from '../customPlugins/inlineplaceholder/placeholder';
import Annexure from '../customPlugins/annexure/annexure';
import Delete from '@ckeditor/ckeditor5-typing/src/delete';
import AnnotationsUIs from '@ckeditor/ckeditor5-comments/src/annotations/annotationsuis';
import Annotations from '@ckeditor/ckeditor5-comments/src/annotations/annotations';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';
import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar';
import EditorWatchdog from '@ckeditor/ckeditor5-watchdog/src/editorwatchdog';
import RevisionHistory from '@ckeditor/ckeditor5-revision-history/src/revisionhistory';

// sonarignore:start
const FONTSIZE = [
    9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 54,
    60, 66, 72, 80,
];
// sonarignore:end

class Editor extends ClassicEditor { }

// Plugins to include in the build.
Editor.builtinPlugins = [
    Alignment,
    Autoformat,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Comments,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    Image,
    Indent,
    Italic,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromOffice,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Strikethrough,
    Table,
    TableCaption,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TrackChanges,
    Underline,
    SimpleBox,
    Placeholder,
    Delete,
    List,
    Annexure,
    AnnotationsUIs,
    Annotations,
    WordCount,
    RevisionHistory,
];

// Editor configuration.
Editor.defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'fontColor',
            'fontSize',
            'fontBackgroundColor',
            'fontFamily',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'insertTable',
            '|',
            'undo',
            'redo',
            '|',
            'pageBreak',
        ],
        shouldNotGroupWhenFull: false,
    },
    language: 'en',
    image: {
        toolbar: [
            'comment',
            'imageTextAlternative',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
        ],
    },
    fontFamily: {
        options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Rakuten Sans UI',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
        ],
    },
    fontSize: {
        options: FONTSIZE,
    },
    placeholderConfig: {
        types: ['date', 'color', 'name', 'surname'],
    },
};

Editor.observers = {
    ckClickObserver: ClickObserver
}
// Create a watchdog for the given editor type.
const ckWatchdog = EditorWatchdog;
export default {Editor, ckWatchdog};
