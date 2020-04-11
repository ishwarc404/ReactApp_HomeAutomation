import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as homeData from "./homeloading.json";
import * as doneData from "./doneloading.json";


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: homeData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ done: true });
          }, 4000);
        });
    }, 3000);
  }

  render() {
    return (
      <div>
        {!this.state.done ? (
          <FadeIn>
            <div class="d-flex justify-content-center align-items-center">
              <h1 style={{color:"#2e3133"}}>fetching HomeAutomation</h1>
              {!this.state.loading ? (
                <Lottie options={defaultOptions} height={480} width={120} />
              ) : (
                <Lottie options={defaultOptions2} height={120} width={120} />
              )}
            </div>
          </FadeIn>
        ) : (
          <h1>Home Automation</h1>
        )}
      </div>
    );
  }
}

