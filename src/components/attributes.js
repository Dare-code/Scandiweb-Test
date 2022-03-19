import React, { Component } from "react";

class Attributes extends Component {
    render() {
        const { attributes: attributesGroup } = this.props.data.product;
        return (
            <div className="attributesWrapper">
                {attributesGroup.length
                    ? attributesGroup.map((attributes) => (
                        <div key={attributes.name}>
                            <div>{attributes.name}</div>
                            <div>
                                {attributes.items.map(option => <div onClick={() => {
                                    this.setState({
                                        ...this.state,
                                        [attributes.name]: option.id
                                    })
                                }} className={"attributeOption" + (this.state && this.state[attributes.name] === option.id ? " active" : "")} key={option.id} style={attributes.type === "swatch" ? { backgroundColor: option.value, borderColor: option.value !== "#FFFFFF" ? option.value : "#000" } : null}>
                                    {attributes.type !== "swatch" ? option.value : null}
                                </div>)}
                            </div>
                        </div>
                    )) : null}
            </div>
        );
    }
}

export default Attributes;
