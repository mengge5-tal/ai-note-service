/**
 * PanelLayout component - manages resizable panels
 * Following FR-013, FR-014
 */

import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import type { PanelLayout as PanelLayoutType } from '../../types/api'

interface PanelLayoutProps {
  layout: PanelLayoutType
  mainPanel: React.ReactNode
  knowledgePanel: React.ReactNode | null
  dialoguePanel: React.ReactNode | null
}

export const PanelLayout: React.FC<PanelLayoutProps> = ({
  layout,
  mainPanel,
  knowledgePanel,
  dialoguePanel,
}) => {
  const mainPanelVisible = layout.panels.find((p) => p.type === 'main')?.visible
  const knowledgePanelVisible = layout.panels.find((p) => p.type === 'knowledge')?.visible
  const dialoguePanelVisible = layout.panels.find((p) => p.type === 'dialogue')?.visible

  return (
    <PanelGroup direction="horizontal" className="h-full w-full">
      {mainPanelVisible && (
        <>
          <Panel defaultSize={layout.widths[0]} minSize={20}>
            <div className="h-full w-full">{mainPanel}</div>
          </Panel>
          {knowledgePanelVisible && (
            <>
              <PanelResizeHandle className="w-2 bg-dark-border hover:bg-purple-500/50 transition-colors cursor-col-resize" />
              <Panel defaultSize={layout.widths[1]} minSize={20}>
                <div className="h-full w-full bg-dark-surface">{knowledgePanel}</div>
              </Panel>
            </>
          )}
          {dialoguePanelVisible && (
            <>
              <PanelResizeHandle className="w-2 bg-dark-border hover:bg-purple-500/50 transition-colors cursor-col-resize" />
              <Panel defaultSize={layout.widths[2]} minSize={20}>
                <div className="h-full w-full bg-dark-surface">{dialoguePanel}</div>
              </Panel>
            </>
          )}
        </>
      )}
    </PanelGroup>
  )
}

