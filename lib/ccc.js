'use babel';

import CccView from './ccc-view';
import { CompositeDisposable } from 'atom';

export default {

  cccView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cccView = new CccView(state.cccViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cccView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ccc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cccView.destroy();
  },

  serialize() {
    return {
      cccViewState: this.cccView.serialize()
    };
  },

  toggle() {
    console.log('Ccc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
