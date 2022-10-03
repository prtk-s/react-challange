import React, { Component } from 'react';
import DiscoverBlockWrapper from './DiscoverBlock';
import '../styles/_discover.scss';
import { login } from '../../../services/api';
import RenderIf from '../../../common/components/RenderIf';
import { CONSTANTS } from '../../../util/constants';
export default class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSuccess: false,
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    login().then(()=> {
      this.setState({
        isLoading: false,
        isSuccess: true,
      });
    }).catch(()=> {
      this.setState({isLoading: false});
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <RenderIf condition={!this.state.isLoading && this.state.isSuccess}>
          <DiscoverBlockWrapper
            text="RELEASED THIS WEEK"
            id="released"
            accessor="albums"
            data={newReleases}
            url={CONSTANTS.API_URL.NEW_RELEASES}
          />
        </RenderIf>
        <RenderIf condition={!this.state.isLoading && this.state.isSuccess}>
          <DiscoverBlockWrapper
            text="FEATURED PLAYLISTS"
            id="featured"
            accessor="playlists"
            data={playlists}
            url={CONSTANTS.API_URL.FEATURED_PLAYLIST}
          />
        </RenderIf>
        <RenderIf condition={!this.state.isLoading && this.state.isSuccess}>
          <DiscoverBlockWrapper
            text="BROWSE"
            id="browse"
            accessor="categories"
            data={categories}
            imagesKey="icons"
            url={CONSTANTS.API_URL.CATEGORIES}
          />
        </RenderIf>
        <RenderIf condition={this.state.isLoading}>
          <div>Loading</div>
        </RenderIf>
      </div>
    );
  }
}
