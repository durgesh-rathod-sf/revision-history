import Command from '@ckeditor/ckeditor5-core/src/command';

export default class PlaceholderCommand extends Command {
    execute({ value }) {
        const editor = this.editor;
        const selection = editor.model.document.selection;

        editor.model.change(writer => {
            // Create a <placeholder> elment with the "name" attribute (and all the selection attributes)...
            let inClause=value.inClause?'in-clause':'';
            const placeholder = writer.createElement('placeholder', {
                ...Object.fromEntries(selection.getAttributes()),
                name: value.name,
                id: value.id,
                class:inClause
            });
            const insertPosition =
                this.editor.model.document.selection.getFirstPosition();

            // ... and insert it into the document.
            editor.model.insertContent(placeholder, insertPosition);

            const lastPosition = this.editor.model.document.selection.getLastPosition();
            const blankSpace = this.editor.data.processor.toView('&nbsp;');
            const blankSpaceFragment = this.editor.data.toModel(blankSpace);
            const range = editor.model.insertContent(blankSpaceFragment, lastPosition);

            // Put the selection on the inserted element.
            writer.setSelection(range, 'on');
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const isAllowed = model.schema.checkChild(selection.focus.parent, 'placeholder');

        this.isEnabled = isAllowed;
    }
}
