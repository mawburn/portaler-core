import React, { Component, MouseEvent } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  state = {
    hasError: false,
    error: Error,
  }

  static getDerivedStateFromError = (error: Error) => ({
    hasError: true,
    error,
  })

  handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.reload()
  }

  render = () => {
    if (this.state.hasError) {
      return (
        <div className="errorPage">
          We're sorry, but this page has encountered a critical error it is
          unable to recover from. Please
          <button onClick={this.handleClick}>Click Here</button> or refresh your
          page.
        </div>
      )
    }

    return this.props.children
  }
}
