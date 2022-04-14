import Button from "@mui/material/Button"
import MUIButtonGroup, { ButtonGroupProps } from "@mui/material/ButtonGroup"

export const ButtonGroup = (props: ButtonGroupProps) => <MUIButtonGroup {...props}>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</MUIButtonGroup>
