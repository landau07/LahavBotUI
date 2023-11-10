import "./App.css";
import { ChatBotContainer } from "./Components/ChatBotContainer";
import { IntlProviderWrapper } from "./Components/IntlProviderWrapper";
import { DecisionTreeProvider } from "./DecisionTree/DecisionTreeContext";

function App() {
  return (
    <IntlProviderWrapper>
      <DecisionTreeProvider>
        <ChatBotContainer />
      </DecisionTreeProvider>
    </IntlProviderWrapper>
  );
}

export default App;
