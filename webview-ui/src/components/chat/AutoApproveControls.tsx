import React from "react"
import styled from "styled-components"
import { VSCodeCheckbox, VSCodeButton } from "@vscode/webview-ui-toolkit/react"

const Container = styled.div`
    display: flex;
    gap: 8px;
    align-items: flex-start;
    margin-left: auto;
    padding-right: 10px;
`

const StyledCheckbox = styled(VSCodeCheckbox)`
    & label {
        font-size: 12px;
    }
`

const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px;
    background: color-mix(in srgb, var(--vscode-badge-background) 50%, transparent);
    border-radius: 4px;
`

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const StyledButton = styled(VSCodeButton)`
    width: 100%;
    font-size: 12px;
    text-align: left;
`

const GroupTitle = styled.div`
    font-size: 11px;
    opacity: 0.7;
    margin-bottom: 2px;
    padding-left: 4px;
`

interface AutoApproveControlsProps {
    approveAll: boolean
    approveExceptCommand: boolean
    approveCommand: boolean
    approveSave: boolean
    approveApprove: boolean
    approveProceed: boolean
    autoScroll: boolean
    onApproveAllChange: (checked: boolean) => void
    onApproveExceptCommandChange: (checked: boolean) => void
    onApproveCommandChange: (checked: boolean) => void
    onApproveSaveChange: (checked: boolean) => void
    onApproveApproveChange: (checked: boolean) => void
    onApproveProceedChange: (checked: boolean) => void
    onAutoScrollChange: (checked: boolean) => void
}

const AutoApproveControls: React.FC<AutoApproveControlsProps> = ({
    approveAll,
    approveExceptCommand,
    approveCommand,
    approveSave,
    approveApprove,
    approveProceed,
    autoScroll,
    onApproveAllChange,
    onApproveExceptCommandChange,
    onApproveCommandChange,
    onApproveSaveChange,
    onApproveApproveChange,
    onApproveProceedChange,
    onAutoScrollChange,
}) => {
    // Handle Auto All click
    const handleApproveAll = () => {
        // Enable all fine-grained options
        onApproveCommandChange(true)
        onApproveSaveChange(true)
        onApproveApproveChange(true)
        onApproveProceedChange(true)
        // Update quick auto states
        onApproveAllChange(true)
        onApproveExceptCommandChange(false)
    }

    // Handle Auto Safe click
    const handleApproveSafe = () => {
        // Enable all except commands
        onApproveCommandChange(false)
        onApproveSaveChange(true)
        onApproveApproveChange(true)
        onApproveProceedChange(true)
        // Update quick auto states
        onApproveAllChange(false)
        onApproveExceptCommandChange(true)
    }

    // Handle Clear All click
    const handleClearAll = () => {
        // Disable all options
        onApproveCommandChange(false)
        onApproveSaveChange(false)
        onApproveApproveChange(false)
        onApproveProceedChange(false)
        // Clear quick auto states
        onApproveAllChange(false)
        onApproveExceptCommandChange(false)
    }

    return (
        <Container>
            <GroupContainer>
                <GroupTitle>Quick Auto</GroupTitle>
                <ButtonGroup>
                    <StyledButton
                        appearance="secondary"
                        onClick={handleApproveAll}
                        title="Auto-approve all actions including commands">
                        Auto All 🤖
                    </StyledButton>
                    <StyledButton
                        appearance="secondary"
                        onClick={handleApproveSafe}
                        title="Auto-approve file changes and browser actions, but not commands">
                        Auto Safe 🛡️
                    </StyledButton>
                    <StyledButton
                        appearance="secondary"
                        onClick={handleClearAll}
                        title="Clear all auto-approve settings">
                        Clear All 🧹
                    </StyledButton>
                </ButtonGroup>
            </GroupContainer>
            <GroupContainer>
                <GroupTitle>Fine Control</GroupTitle>
                <StyledCheckbox
                    checked={approveCommand}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked
                        onApproveCommandChange(checked)
                    }}
                    disabled={approveAll || approveExceptCommand}
                    title="Auto-approve command executions">
                    Commands ⌨️
                </StyledCheckbox>
                <StyledCheckbox
                    checked={approveSave}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked
                        onApproveSaveChange(checked)
                    }}
                    disabled={approveAll || approveExceptCommand}
                    title="Auto-approve file saves">
                    Files 📄
                </StyledCheckbox>
                <StyledCheckbox
                    checked={approveApprove}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked
                        onApproveApproveChange(checked)
                    }}
                    disabled={approveAll || approveExceptCommand}
                    title="Auto-approve browser actions">
                    Browser 🌐
                </StyledCheckbox>
                <StyledCheckbox
                    checked={approveProceed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked
                        onApproveProceedChange(checked)
                    }}
                    disabled={approveAll || approveExceptCommand}
                    title="Auto-approve 'Proceed While Running' actions">
                    Proceed ▶️
                </StyledCheckbox>
                <StyledCheckbox
                    checked={autoScroll}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked
                        onAutoScrollChange(checked)
                    }}
                    title="Auto-scroll to new content">
                    Auto Scroll 📜
                </StyledCheckbox>
            </GroupContainer>
        </Container>
    )
}

export default AutoApproveControls
