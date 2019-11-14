import React from "react";

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="text" className="form-control form-control-lg text-center text-md-left text-capitalize custom-input" name="city" placeholder="Votre ville" required />
            </form>
        )
    }
}

export default Form;