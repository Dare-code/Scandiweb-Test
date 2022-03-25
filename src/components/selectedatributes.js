import React, { Component } from "react";

export default class SelectedAtributes extends Component {
    render() {
        console.log(this.props, 'props')
        return (
            <div className="selectedattr">
                {this.props.attributes &&
                    Object.keys(this.props.attributes).map((option) => (
                        <div
                            key={`${this.props.attributes.id}-attrs-${option}`}
                            className="dropdownInactive"
                        >
                            <span
                                style={{
                                    backgroundColor: this.props.attributes[option],
                                    borderColor:
                                        option.value !== "#FFFFFF"
                                            ? option.value
                                            : "#000",
                                }}
                                className="size">
                                {this.props.attributes[option]}
                            </span>
                        </div>
                    ))}
            </div>
        );
    }
}
