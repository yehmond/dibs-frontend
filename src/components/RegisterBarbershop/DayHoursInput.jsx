import React, { Component } from "react";
import "../FormFields/Fields.scss";
import { RenderTimePicker } from "../FormFields/FormFields";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { DEFAULT_FROM, DEFAULT_TO } from "../../utils/constants";
import { addColonTime, removeColon } from "../../utils/utils";

class DayHoursInput extends Component {
    constructor(props) {
        super(props);
        this.state = { day: this.props.day };
        this.toggleClosed = this.toggleClosed.bind(this);
        this.handleChangeClose = this.handleChangeClose.bind(this);
        this.handleChangeOpen = this.handleChangeOpen.bind(this);
    }

    toggleClosed() {
        const prevChecked = this.state.day.isOpen;
        this.setState({ day: { ...this.state.day, isOpen: !prevChecked } }, () => {
            if (prevChecked) {
                this.setState(
                    { day: { ...this.state.day, from: "", to: "" } },
                    this.bindStateToProps
                );
            } else {
                this.setState(
                    {
                        day: {
                            ...this.state.day,
                            from: DEFAULT_FROM,
                            to: DEFAULT_TO,
                        },
                    },
                    this.bindStateToProps
                );
            }
        });
    }

    handleChangeOpen(event) {
        this.setState(
            { day: { ...this.state.day, from: removeColon(event.target.value) } },
            this.bindStateToProps
        );
    }

    handleChangeClose(event) {
        this.setState(
            { day: { ...this.state.day, to: removeColon(event.target.value) } },
            this.bindStateToProps
        );
    }

    bindStateToProps() {
        this.props.day.isOpen = this.state.day.isOpen;
        this.props.day.from = this.state.day.from;
        this.props.day.to = this.state.day.to;
    }

    render() {
        return (
            <div className="time-input-container">
                <h2>{this.props.dayOfWeek}</h2>
                <div className="time-fields">
                    <RenderTimePicker
                        disabled={!this.state.day.isOpen}
                        value={addColonTime(this.state.day.from)}
                        handleChange={this.handleChangeOpen}
                    />
                    <p>To</p>
                    <RenderTimePicker
                        disabled={!this.state.day.isOpen}
                        handleChange={this.handleChangeClose}
                        value={addColonTime(this.state.day.to)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={this.state.day.locked}
                                onChange={this.toggleClosed}
                                name="checkedB"
                                checked={!this.state.day.isOpen}
                                color="primary"
                            />
                        }
                        label={this.props.label}
                    />
                </div>
            </div>
        );
    }
}

export default DayHoursInput;
