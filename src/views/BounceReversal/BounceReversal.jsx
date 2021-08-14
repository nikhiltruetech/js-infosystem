import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const BounceReversal = () => {
  const history = useHistory()
  const handleClick=()=>{
      history.push('bounce-reversal/maker')
  }
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={10}>
          Bounce Reversal (Search)
        </GridItem>
        <GridItem xs={12} sm={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={()=> handleClick()}
          >
            Create reversal
          </Button>
        </GridItem>
        <GridItem xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">
              Loan Account Number
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </GridItem>
        <GridItem xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">
              Receipt Ref #
            </InputLabel>
            <Input id="input-with-icon-adornment" />
          </FormControl>
        </GridItem>
        <GridItem xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">
              Transaction Branch
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </GridItem>
        <GridItem xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">Maker</InputLabel>
            <Input id="input-with-icon-adornment" />
          </FormControl>
        </GridItem>
        <GridItem xs={6} sm={6}>
          <TextField
            id="date"
            label="Reversal From date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </GridItem>
        <GridItem xs={6} sm={6}>
          <TextField
            id="date"
            label="Reversal To date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </GridItem>
        <Box m={3}>
        <GridItem xs={12}  >
         <Button startIcon={<SearchIcon />} color="primary" variant="contained">Search</Button>
         <Button startIcon={<FiberManualRecordIcon />} color="secondary" variant="contained">Clear</Button>
         <Button startIcon={<FiberManualRecordIcon />} color="" variant="contained">Clear Result</Button>
        </GridItem>
        <GridItem xs={3} >
        </GridItem>
        <GridItem xs={3}  >
        </GridItem>
        </Box>
      </GridContainer>
    </div>
  );
};

export default BounceReversal;
