import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSimpleBoxCommand extends Command {
    execute({ clauseData }) {
        this.editor.model.change(writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            const clauseTextView = this.editor.data.processor.toView(clauseData.clauseText);
            const clauseTextFragment = this.editor.data.toModel(clauseTextView);

            const insertPosition =
                this.editor.model.document.selection.getFirstPosition();
            const item = createSimpleBox(writer, clauseData, clauseTextFragment);
            this.editor.model.insertContent(item, insertPosition);
            const newPosition = this.editor.model.createPositionAfter(item);
            const range = this.editor.model.insertContent(writer.createElement('paragraph'), newPosition);
            writer.setSelection(range, 'on');
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'simpleBox');

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox(writer, clauseData, clauseTextFragment) {
    const simpleBox = writer.createElement('simpleBox', { id: clauseData.id });
    const simpleBoxTitle = writer.createElement('simpleBoxTitle', {
        class: 'simple-box-title',
    });
    const simpleBoxDescription = writer.createElement('simpleBoxDescription', {
        class: 'simple-box-description',
    });
    simpleBox.editable = false;
    simpleBoxDescription.editable = false;
    simpleBoxTitle.editable = false;
    writer.append(simpleBoxTitle, simpleBox);
    writer.append(simpleBoxDescription, simpleBox);

    writer.insert(clauseData.clauseTitle, simpleBoxTitle);
    writer.append(clauseTextFragment, simpleBoxDescription)
    return simpleBox;
}