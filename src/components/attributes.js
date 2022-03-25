import React, { Component } from "react";

class Attributes extends Component {
    constructor(props) {
        super(props);
        this.updateAttributesForProduct =
            this.updateAttributesForProductHander.bind(this);
    }

    updateAttributesForProductHander(key, value, type) {
        this.props.updateProduct({
            ...this.props.data.product,
            selectedAttributes: {
                ...this.props.data.product.selectedAttributes,
                [key]: value,
                type: type
            },
        });
    }

    render() {
        const { attributes: attributesGroup, selectedAttributes } =
            this.props.data.product;
        return (
            <div className="attributesWrapper">
                {attributesGroup.length
                    ? attributesGroup.map((attributes) => (
                        <div key={attributes.name}>
                            <div>{attributes.name}</div>
                            <div>
                                {attributes.items.map((option) => (
                                    <div
                                        onClick={() => {
                                            this.updateAttributesForProduct(
                                                attributes.name,
                                                option.id,
                                                attributes.type
                                            );
                                        }}
                                        className={
                                            "attributeOption" +
                                            (selectedAttributes &&
                                                selectedAttributes[attributes.name] === option.id
                                                ? " active"
                                                : "")
                                        }
                                        key={option.id}
                                        style={
                                            attributes.type === "swatch"
                                                ? {
                                                    backgroundColor: option.value,
                                                    borderColor:
                                                        option.value !== "#FFFFFF"
                                                            ? option.value
                                                            : "#000",
                                                }
                                                : null
                                        }
                                    >
                                        {attributes.type !== "swatch" ? option.value : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                    : null}
            </div>
        );
    }
}

export default Attributes;
