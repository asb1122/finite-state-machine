class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config == null){
        throw new Error();
      }
      this.config = config;
      this.state = config.initial;
      this.prevState = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.config.states){
        this.prevState = this.state;
        this.state = state;
      } else {
        throw new Error();
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      var key = this.state;
      if (this.config.states[key].transitions[event]){
        this.state = this.config.states[key].transitions[event];
      } else {
        throw new Error();
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var states = [];
      for(var key in this.config.states){
        if (event == null){
          states.push(key);
        } else if (event in this.config.states[key].transitions){
          states.push(key);
        }
      }
      return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.prevState == null){
        return false;
      } else {
        this.state = this.prevState;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/ @Created by Uladzimir Halushka /
