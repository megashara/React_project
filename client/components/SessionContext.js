import { MainLayout } from "./MainLayout";

class SessionContext extends React.Component {
    static contextType = MainLayout;
    constructor(props){
        super(props);
    }
    
    render() {
      let value = this.context;
    }
  }