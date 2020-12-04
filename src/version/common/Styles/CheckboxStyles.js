import { makeStyles } from "@material-ui/core"

export const usePrimaryCheckboxStyles = makeStyles((theme) => {
  return {
    muiCheckboxRoot: {
      color: theme.palette.mainColor,
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.mainColor,
      "&:hover": {
        backgroundColor: theme.palette.mainColor,
        opacity: 0.04,
      },
      "&.Mui-checked": {
        color: theme.palette.mainColor,
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.mainColor,
      },
    },
  }
})
