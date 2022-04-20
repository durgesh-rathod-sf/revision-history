import AnnexureEditing from './annexure-editing';
import AnnexureUI from './annexure-ui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Annexure extends Plugin {
  static get requires() {
    return [AnnexureEditing, AnnexureUI];
  }
}