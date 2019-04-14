//Een error boundary perkt een niet-werkend deel van de app in en laat een boodschap zien mbt 
// at er niet werkt, zodat niet de hele app crasht als één element geen contact krijgt met een server

import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage: error })
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>
        } else {
            return this.props.children; // okee weird, maar je moet dit ErrorBoundaryding óm een andere component heen wrappen. Dus als er geen error is, dan return je sinpelweg dat component, dat hier dus props.children is
        }
    }
}

export default ErrorBoundary;

//Discount Jonas: 'En nu niet je hele app in error boundaries gaan wikkelen, alleen de dingen waarvan je weet 
//dat het misschien gaat falen.'
//En hij denkt niet dat dat Venn-diagram een cirkel is?