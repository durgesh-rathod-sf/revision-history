import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertAnnexureCommand from './insert-annexure-command';

export default class AnnexureEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        // 'AnnexureBoxEditing#init() got called'

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertAnnexure', new InsertAnnexureCommand(this.editor));
    }

    _defineSchema() {
        const schema = this.editor && this.editor.model.schema;

        schema.register('annexureBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,
            inheritAllFrom: '$block',
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',
            isSelectable: false,

            allowAttributeOf: '$root',
            allowAttributes: ['id', 'class', 'htmlAttributes'],
        });

        schema.register('annexureBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'annexureBox',
            isSelectable: false,
            allowAttributes: ['class'],

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        });

        schema.register('annexureBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            isSelectable: false,
            allowIn: 'annexureBox',
            allowAttributes: ['class'],

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root',

            allowAttributeOf: '$root'
        });

        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith('annexureBoxDescription') && childDefinition.name == 'annexureBox') {
                return false;
            }
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        conversion.attributeToAttribute( { model: 'id', view: 'id' } );
        // <annexureBox> converters
        conversion.for('upcast').elementToElement({
            model: 'annexureBox',
            view: {
                name: 'section',
                classes: 'annexure'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'annexureBox',
            view: (modelElement, { writer: viewWriter }) => {
                let annexureId = modelElement.getAttribute('id');
                if (!annexureId) {
                    const allAttributes = modelElement.getAttribute("htmlAttributes");
                    annexureId = allAttributes && (
                        allAttributes.id || 
                        (
                            allAttributes.attributes && 
                            allAttributes.attributes.id
                        )
                    );
                }
                return viewWriter.createContainerElement('section', { class: 'annexure', id: annexureId });
            }
            // view: {
            //     name: 'section',
            //     classes: 'annexure'
            // }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'annexureBox',
            view: (modelElement, { writer: viewWriter }) => {
                let annexureId = modelElement.getAttribute('id');
                if (!annexureId) {
                    const allAttributes = modelElement.getAttribute("htmlAttributes");
                    annexureId = allAttributes && (
                        allAttributes.id || 
                        (
                            allAttributes.attributes && 
                            allAttributes.attributes.id
                        )
                    );
                }
                const section = viewWriter.createContainerElement('section', { class: 'annexure', contenteditable: true,  id: annexureId });

                return toWidget(section, viewWriter);
            }
        });

        // <annexureBoxTitle> converters
        conversion.for('upcast').elementToElement({
            model: 'annexureBoxTitle',
            view: {
                name: 'h2',
                classes: 'annexure-text'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'annexureBoxTitle',
            view: (modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                return viewWriter.createEditableElement('h2', { unselectable: 'on', class: 'annexure-text', contenteditable: false });
            }
            // view: {
            //     name: 'h2',
            //     classes: 'annexure-text'
            // }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'annexureBoxTitle',
            view: (modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                // const h2 = viewWriter.createEditableElement( 'h2', { unselectable: 'on', class: 'annexure-text', contenteditable: false } );

                // return toWidget( h2, viewWriter );
                return viewWriter.createEditableElement('h2', { unselectable: 'on', class: 'annexure-text', contenteditable: false });
            }
        });

        // <annexureBoxDescription> converters
        conversion.for('upcast').elementToElement({
            model: 'annexureBoxDescription',
            view: {
                name: 'div',
                classes: 'annexure-box-description'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'annexureBoxDescription',
            // view: (modelElement, { writer: viewWriter }) => {
            //     // Note: You use a more specialized createEditableElement() method here.
            //     return  viewWriter.createEditableElement('div', { class: 'annexure-box-description' });
            //     // return toWidgetEditable( div, viewWriter );

            // }
            view: {
                name: 'div',
                classes: 'annexure-box-description'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'annexureBoxDescription',
            view: (modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'annexure-box-description' });

                return toWidgetEditable( div, viewWriter );
                return viewWriter.createEditableElement('div', { class: 'annexure-box-description' });
            }
        });
    }
}