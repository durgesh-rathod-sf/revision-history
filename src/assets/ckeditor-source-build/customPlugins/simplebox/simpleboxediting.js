import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertSimpleBoxCommand from './insertsimpleboxcommand';

export default class SimpleBoxEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        // 'SimpleBoxEditing#init() got called'

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertSimpleBox', new InsertSimpleBoxCommand(this.editor));
    }

    _defineSchema() {
        const schema = this.editor && this.editor.model.schema;

        schema.register('simpleBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,
            inheritAllFrom: '$block',
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',
            isSelectable: false,

            allowAttributeOf: '$root',
            allowAttributes: ['id', 'class', 'htmlAttributes'],
        });

        schema.register('simpleBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleBox',
            isSelectable: false,
            allowAttributes: ['class'],

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        });

        schema.register('simpleBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            isSelectable: false,
            allowIn: 'simpleBox',
            allowAttributes: ['class'],

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root',

            allowAttributeOf: '$root'
        });

        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith('simpleBoxDescription') && childDefinition.name == 'simpleBox') {
                return false;
            }
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        conversion.attributeToAttribute( { model: 'id', view: 'id' } );
        // <simpleBox> converters
        conversion.for('upcast').elementToElement({
            model: 'simpleBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'simpleBox',
            view: (modelElement, { writer: viewWriter }) => {
                let clauseId = modelElement.getAttribute('id');
                if (!clauseId) {
                    const allAttributes = modelElement.getAttribute("htmlAttributes");
                    clauseId = allAttributes && (
                        allAttributes.id || 
                        (
                            allAttributes.attributes && 
                            allAttributes.attributes.id
                        )
                    );
                }
                return viewWriter.createContainerElement('section', { unselectable: 'on', class: 'simple-box', id: clauseId, contenteditable: false });
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'simpleBox',
            view: (modelElement, { writer: viewWriter }) => {
                let clauseId = modelElement.getAttribute('id');
                if (!clauseId) {
                    const allAttributes = modelElement.getAttribute("htmlAttributes");
                    clauseId = allAttributes && (
                        allAttributes.id || 
                        (
                            allAttributes.attributes && 
                            allAttributes.attributes.id
                        )
                    );
                }
                const section = viewWriter.createContainerElement('section', { unselectable: 'on', class: 'simple-box', id: clauseId, contenteditable: false });

                return toWidget(section, viewWriter);
            }
        });

        // <simpleBoxTitle> converters
        conversion.for('upcast').elementToElement({
            model: 'simpleBoxTitle',
            view: {
                name: 'h5',
                classes: 'simple-box-title'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'simpleBoxTitle',
            view: (modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                return viewWriter.createEditableElement('h5', { unselectable: 'on', class: 'simple-box-title', contenteditable: false });
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'simpleBoxTitle',
            view: (modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                return viewWriter.createEditableElement('h5', { unselectable: 'on', class: 'simple-box-title', contenteditable: false });
            }
        });

        // <simpleBoxDescription> converters
        conversion.for('upcast').elementToElement({
            model: 'simpleBoxDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'simpleBoxDescription',
            view: (modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                return viewWriter.createEditableElement('div', { unselectable: 'on', class: 'simple-box-description', contenteditable: false });
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'simpleBoxDescription',
            view: (modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                return viewWriter.createEditableElement('div', { unselectable: 'on', class: 'simple-box-description', contenteditable: false });
            }
        });
    }
}