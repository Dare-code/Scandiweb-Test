import React, { Component } from "react";

export default class SelectedAtributes extends Component {
    render() {
        return (
            <div className="selectedattr">
                {this.props.attributes &&
                    Object.keys(this.props.attributes).map((option) => (
                        <div
                            key={`${this.props.attributes}-attrs-${option}`}
                            className="dropdownInactive"
                        >
                            <span
                                style={
                                    this.props.attributes[option].type === "swatch"
                                        ? {
                                            backgroundColor: this.props.attributes[option].option,
                                            borderColor:
                                                option.value !== "#FFFFFF" ? option.value : "#000",
                                        }
                                        : null
                                }
                                className="size"
                            >
                                {this.props.attributes[option].type !== "swatch"
                                    ? this.props.attributes[option].option
                                    : null}
                            </span>
                        </div>
                    ))}
            </div>
        );
    }
}
