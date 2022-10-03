import React, { Component } from 'react';
import DiscoverBlock from './components/DiscoverBlock';
import RenderIf from '../../../../common/components/RenderIf';
import { get } from '../../../../services/api';
export default class DiscoverBlockWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: []
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    get(this.props.url).then((data)=> {
        console.log("data", data?.data[this.props.accessor]?.items)
      this.setState({
        isLoading: false,
        data: data?.data[this.props.accessor]?.items || [],
      });
    }).catch(()=> {
      this.setState({isLoading: false});
    })
  }

  render() {
    const { data } = this.state;
    const { text, id, imagesKey, isLoading } = this.props;

    return (
      <div className="discover">
        <RenderIf condition={!this.state.isLoading}>
          <DiscoverBlock
            text={text}
            id={id}
            data={data}
            imagesKey={imagesKey}
            isLoading={isLoading}
          />
        </RenderIf>
      </div>
    );
  }
}
