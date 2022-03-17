import React, { Component } from "react";

class Atributes extends Component {
    // checkColorFunction = () => {
    //     let atribute = [];
    //     this.state.data.product.attributes.map((atribute) => {
    //         if (atribute.type === 'swatch') {
    //             return null
    //         }
    //         if (atribute.type === 'text') {
    //             atribute = atribute.type
    //         }
    //         return true
    //     })
    //     this.setState({
    //         atribute: atribute
    //     })
    // }

    render() {
        const { attributes } = this.props.data.product;
        return (
            <div className="sizeBox">
                {!attributes.length
                    ? null
                    : attributes[0].items.map((value) => (
                        <div
                            key={value.id}
                            style={{ background: value.value }}
                            className={
                                this.props.activeSizeBox === value.id
                                    ? "sizeBoxActive"
                                    : "sizeBoxInactive"
                            }
                            onClick={() => this.setState({ activeSizeBox: value.id })}
                        >
                            <span
                                className={
                                    this.props.activeSizeBox === value.id ? "active" : "size"
                                }
                            >
                                {value.displayValue}
                            </span>
                        </div>
                    ))}
            </div>
        );
    }
}

export default Atributes;
