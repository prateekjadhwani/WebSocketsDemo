export default class TimeManager extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();
    this._timestamp = 0;

    // Then lets render the template
    this.render();
    setInterval(() => {
      // lets increase the seconds
      this._timestamp += 1;
      this.handleTimestamp();
    }, 1000);
  }

  set reset (value) {
    if(value) {
      this._timestamp = 0;
      this.render();
    }
  }

  render() {
    this.innerText = 'Updated now';
  }

  handleTimestamp() {
    if(this._timestamp > 5) {
      this.innerText = 'Updated Few Seconds ago';
    }

    if(this._timestamp > 60) {
      this.innerText = 'Updated a minute ago';
    }

    if(this._timestamp > 120) {
      this.innerText = 'Updated few minutes ago';
    }
  }
}
