import React, { Component } from "react";

export default class NhsWidgetDisplay extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            width: null
        };

        this.timeout = null;
        this.containerRef = React.createRef();
    }
    
    componentDidMount() {
        window.addEventListener("resize", () => this.updateWidth());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.updateWidth());
    }

    updateWidth() {
        const { timeout, containerRef } = this;

        if (timeout) {
            window.clearTimeout(timeout);
            this.timeout = null;
        }

        this.timeout = window.setTimeout(() => {
            this.setState({ width: (containerRef.current && containerRef.current.offsetWidth) || 0 });
            this.timeout = null;
        } , 500);
    }

    render() {

        const { height, src } = this.props;
        const { width } = this.state;

        const resolvedWidth = width || 500;

        return (
            <div ref={this.containerRef} style={{ width: "100%", height }}>
                <iframe 
                    src={`${src}&h=${height}&w=${width}`} 
                    style={{ borderStyle: "none", height, width: resolvedWidth }}
                    onLoad={() => this.updateWidth()}
                >
                </iframe>
            </div>
        )
    }
}