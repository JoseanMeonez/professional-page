'use client'
import { Component, ReactNode } from 'react'

/** Renders nothing if WebGL is unavailable or the scene throws: the page must work without 3D. */
export default class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
