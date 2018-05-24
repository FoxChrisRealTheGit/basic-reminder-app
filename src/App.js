import React, { Component } from 'react';
import { connect } from "react-redux"
import moment from "moment";
import { addReminder, removeReminder, clearReminders } from "./ducks/actions"
import './css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: ""
    }
    this.addReminder = this.addReminder.bind(this);
    this.removeReminder = this.removeReminder.bind(this)
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate)
    this.setState({
      text: "",
      dueDate: ""
    })
  }

  removeReminder(id) {
    this.props.removeReminder(id)
  }

  renderReminders() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div>&nbsp;- <em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div className="list-item delete-button" onClick={() => this.removeReminder(reminder.id)} >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )

  }
  render() {
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to..."
              value={this.state.text}
              onChange={event => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control"
              type="datetime-local"
              value={this.state.dueDate}
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.addReminder();
              }
            }}
          >Add Reminder</button>
        </div>
        {this.renderReminders()}
        <div
            className="btn btn-danger"
            onClick={()=>this.props.clearReminders()}
        >
            Clear Reminders
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, removeReminder, clearReminders })(App);
