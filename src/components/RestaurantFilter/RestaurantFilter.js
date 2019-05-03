import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Search } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { filterRestaurants } from "../../actions/actions";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";

import "./RestaurantFilter.css";

class RatingFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: "",
      ratingFilter: -1,
      isAdvancedSearch: false,
      minRating: 0,
      maxRating: 0,
      isSearchEnable: true
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheckBox = () => {
    this.setState({ isAdvancedSearch: !this.state.isAdvancedSearch });

    if (!this.state.isAdvancedSearch) {
      this.setState({ minRating: 0, maxRating: 0 });
    }
  };

  handleChangeSlider = name => (event, value) => {
    this.setState({ [name]: value });

    const { minRating, maxRating } = this.state;
    let isEnable = false;

    minRating < maxRating ? (isEnable = false) : (isEnable = true);
    this.setState({ isSearchEnable: isEnable });
  };

  filterRestaurants = () => {
    const minRating = this.state.isAdvancedSearch ? this.state.minRating : 0;
    const maxRating = this.state.isAdvancedSearch ? this.state.maxRating : 0;

    this.props.filterRestaurants(
      this.state.filterText,
      this.state.ratingFilter,
      minRating,
      maxRating
    );
  };

  render() {
    return (
      <div className="filter-container">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Restaurant Name"
              onChange={this.handleChange("filterText")}
              margin="normal"
              className="less-width"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className="form-control less-width">
              <InputLabel htmlFor="rating-filter">Rating</InputLabel>
              <Select
                onChange={this.handleChange("ratingFilter")}
                value={this.state.ratingFilter}
                inputProps={{
                  name: "ratingFilter",
                  id: "rating-filter"
                }}
              >
                <MenuItem value={-1}>None</MenuItem>
                <MenuItem value={0}>0 Star</MenuItem>
                <MenuItem value={1}>1 Star</MenuItem>
                <MenuItem value={2}>2 Star</MenuItem>
                <MenuItem value={3}>3 Star</MenuItem>
                <MenuItem value={4}>4 Star</MenuItem>
                <MenuItem value={5}>5 Star</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div>
          {this.state.isAdvancedSearch && (
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <Typography id="body1">Search by rating</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography id="label" className="text-center">
                  Min Rating ({this.state.minRating})
                </Typography>
                <Slider
                  value={this.state.minRating}
                  min={0}
                  max={5}
                  step={1}
                  onChange={this.handleChangeSlider("minRating")}
                  className="less-width"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography id="label" className="text-center">
                  Max Rating ({this.state.maxRating})
                </Typography>
                <Slider
                  value={this.state.maxRating}
                  min={0}
                  step={1}
                  max={5}
                  onChange={this.handleChangeSlider("maxRating")}
                  className="less-width"
                />
              </Grid>
            </Grid>
          )}
        </div>
        <div>
          <FormControlLabel
            style={{ paddingTop: `25px` }}
            control={
              <Switch
                checked={this.state.checkedA}
                onChange={this.handleChangeCheckBox}
                value="isAdvancedSearch"
                color="primary"
              />
            }
            label="Advanced Search"
          />
          <Button
            variant="contained"
            color="primary"
            className="filter-button"
            disabled={this.state.isSearchEnable && this.state.isAdvancedSearch}
            onClick={this.filterRestaurants}
          >
            <Search />
            Filter Restaurants
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { filterRestaurants }
)(RatingFilter);
