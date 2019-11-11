import React from "react";

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <div className="input-group">
                    <input type="text" className="form-control custom-input" name="city" placeholder="Ville" required />
                </div>
            </form>
        )
    }
}

export default Form;