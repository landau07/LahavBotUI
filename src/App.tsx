import "./App.css";
import { AmplitudeInitializer } from "./Components/AmplitudeInitializer";
import { ChatBotContainer } from "./Components/ChatBotContainer";
import { IntlProviderWrapper } from "./Components/IntlProviderWrapper";
import { DecisionTreeProvider } from "./DecisionTree/DecisionTreeContext";

function App() {
  return (
    <AmplitudeInitializer>
      <IntlProviderWrapper>
        <DecisionTreeProvider>
          <ChatBotContainer />
        </DecisionTreeProvider>
      </IntlProviderWrapper>
    </AmplitudeInitializer>
  );
}

export default App;
