import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertAnnexureCommand extends Command {
    execute({ annexureData }) {
        this.editor.model.change(writer => {
            // Insert <annexureBox>*</annexureBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            const insertPosition =
                this.editor.model.document.selection.getFirstPosition();
            const item =  createAnnexureBox(writer, annexureData);
            this.editor.model.insertContent(item, insertPosition);
            const newPosition = this.editor.model.createPositionAfter(item);
            const range = this.editor.model.insertContent(writer.createElement('paragraph'), newPosition);
            writer.setSelection(range, 'on');
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'annexureBox');

        this.isEnabled = allowedIn !== null;
    }
}

function createAnnexureBox(writer, annexureData) {
    const annexureBox = writer.createElement('annexureBox', { id: annexureData.id,  class: 'annexure'});
    const annexureBoxTitle = writer.createElement('annexureBoxTitle', {
        class: 'annexure-text',
    });
    const annexureBoxDescription = writer.createElement('annexureBoxDescription', {
        class: 'annexure-box-description',
    });

    annexureBoxTitle.editable = false;
    writer.appendElement('paragraph', annexureBoxDescription);
    writer.append(annexureBoxTitle, annexureBox);
    writer.append(annexureBoxDescription, annexureBox);

    writer.insert(annexureData.name, annexureBoxTitle);
    return annexureBox;
}