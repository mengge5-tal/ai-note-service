/**
 * React Hook for panel layout management
 * Following FR-013, FR-014
 */

import React, { createContext, useContext, useState, useCallback } from 'react'
import { storage } from '../utils/storage'
import type { PanelLayout } from '../types/api'

interface PanelLayoutContextType {
  layout: PanelLayout
  updatePanelWidths: (widths: number[]) => void
  showPanel: (type: 'knowledge' | 'dialogue') => void
  hidePanel: (type: 'knowledge' | 'dialogue') => void
  resetLayout: () => void
}

const PanelLayoutContext = createContext<PanelLayoutContextType | null>(null)

const DEFAULT_LAYOUT: PanelLayout = {
  panels: [
    { id: 'main', type: 'main', visible: true, width: 100 },
    { id: 'knowledge', type: 'knowledge', visible: false, width: 0 },
    { id: 'dialogue', type: 'dialogue', visible: false, width: 0 },
  ],
  widths: [100, 0, 0],
  minWidths: [200, 300, 300],
}

export const PanelLayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [layout, setLayout] = useState<PanelLayout>(() => {
    // Try to load from localStorage
    const savedWidths = storage.loadPanelWidths()
    if (savedWidths && savedWidths.length === 3) {
      return {
        ...DEFAULT_LAYOUT,
        widths: savedWidths,
        panels: DEFAULT_LAYOUT.panels.map((panel, index) => ({
          ...panel,
          width: savedWidths[index] || 0,
          visible: savedWidths[index] > 0,
        })),
      }
    }
    return DEFAULT_LAYOUT
  })

  // Update panel widths
  const updatePanelWidths = useCallback((widths: number[]) => {
    setLayout((prev) => {
      const newLayout: PanelLayout = {
        ...prev,
        widths,
        panels: prev.panels.map((panel, index) => ({
          ...panel,
          width: widths[index] || 0,
          visible: widths[index] > 0,
        })),
      }
      // Save to localStorage
      storage.savePanelWidths(widths)
      return newLayout
    })
  }, [])

  // Show panel
  const showPanel = useCallback(
    (type: 'knowledge' | 'dialogue') => {
      setLayout((prev) => {
        const panelIndex = prev.panels.findIndex((p) => p.type === type)
        if (panelIndex === -1) return prev

        const newWidths = [...prev.widths]
        const visiblePanels = prev.panels.filter((p) => p.visible).length

        if (!prev.panels[panelIndex].visible) {
          // Calculate new widths when showing a panel
          const totalVisible = visiblePanels + 1
          const baseWidth = 100 / totalVisible

          // Adjust all visible panels
          prev.panels.forEach((panel, index) => {
            if (panel.visible || index === panelIndex) {
              newWidths[index] = baseWidth
            } else {
              newWidths[index] = 0
            }
          })

          const newLayout: PanelLayout = {
            ...prev,
            widths: newWidths,
            panels: prev.panels.map((panel, index) => ({
              ...panel,
              width: newWidths[index],
              visible: panel.visible || index === panelIndex,
            })),
          }

          storage.savePanelWidths(newWidths)
          return newLayout
        }

        return prev
      })
    },
    []
  )

  // Hide panel
  const hidePanel = useCallback((type: 'knowledge' | 'dialogue') => {
    setLayout((prev) => {
      const panelIndex = prev.panels.findIndex((p) => p.type === type)
      if (panelIndex === -1 || !prev.panels[panelIndex].visible) return prev

      const newWidths = [...prev.widths]
      const visiblePanels = prev.panels.filter((p) => p.visible).length

      if (visiblePanels > 1) {
        // Redistribute width to remaining panels
        const widthToRedistribute = newWidths[panelIndex]
        const remainingPanels = prev.panels.filter(
          (p, i) => p.visible && i !== panelIndex
        )
        const widthPerPanel = widthToRedistribute / remainingPanels.length

        prev.panels.forEach((panel, index) => {
          if (panel.visible && index !== panelIndex) {
            newWidths[index] += widthPerPanel
          } else if (index === panelIndex) {
            newWidths[index] = 0
          }
        })

        const newLayout: PanelLayout = {
          ...prev,
          widths: newWidths,
          panels: prev.panels.map((panel, index) => ({
            ...panel,
            width: newWidths[index],
            visible: panel.visible && index !== panelIndex,
          })),
        }

        storage.savePanelWidths(newWidths)
        return newLayout
      }

      return prev
    })
  }, [])

  // Reset layout
  const resetLayout = useCallback(() => {
    setLayout(DEFAULT_LAYOUT)
    storage.savePanelWidths(DEFAULT_LAYOUT.widths)
  }, [])

  return (
    <PanelLayoutContext.Provider
      value={{
        layout,
        updatePanelWidths,
        showPanel,
        hidePanel,
        resetLayout,
      }}
    >
      {children}
    </PanelLayoutContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePanelLayout = (): PanelLayoutContextType => {
  const context = useContext(PanelLayoutContext)
  if (!context) {
    throw new Error('usePanelLayout must be used within PanelLayoutProvider')
  }
  return context
}

