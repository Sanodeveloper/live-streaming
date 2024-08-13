import React, { ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends React.Component<{ children?: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children?: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_error: Error) {
        return { hasError: true };
    }
    componentDidMount() {
        window.addEventListener("unhandledrejection", this.onUnhandledRejection);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
    }

    onUnhandledRejection = (event: PromiseRejectionEvent) => {
        event.promise.catch((error) => {
            this.setState(ErrorBoundary.getDerivedStateFromError(error));
        });
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}