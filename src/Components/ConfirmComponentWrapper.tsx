// WrapperComponent.tsx
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ChatMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";

export type ConfirmComponentProps = {
  setData: React.Dispatch<React.SetStateAction<string>>;
  isAfterConfirmState: boolean;
};

type ConfirmComponentWrapperProps = {
  ContentComponent: ({ setData }: ConfirmComponentProps) => JSX.Element;
  defaultValue: string;
  onConfirmButtonClicked: (data: string) => void;
  shouldLocalizeData: boolean;
} & React.HTMLProps<HTMLDivElement>;

export function ConfirmComponentWrapper({
  ContentComponent,
  defaultValue,
  onConfirmButtonClicked,
  shouldLocalizeData,
}: ConfirmComponentWrapperProps) {
  const [isAfterConfirmState, setIsAfterConfirmState] = useState(false);
  const [data, setData] = useState<string>(defaultValue);

  const handleConfirmClick = () => {
    setIsAfterConfirmState(true);
    onConfirmButtonClicked(data ?? "N/A");
  };

  return (
    <div>
      <ChatMessage sender="bot">
        <ContentComponent
          setData={setData}
          isAfterConfirmState={isAfterConfirmState}
        />
      </ChatMessage>
      {!isAfterConfirmState && data && (
        <ConfirmButton
          position="end"
          disabled={!data}
          onClick={() => {
            setIsAfterConfirmState(true);
            handleConfirmClick();
          }}
        />
      )}
      {isAfterConfirmState && (
        <ChatMessage sender="user">
          {shouldLocalizeData ? <FormattedMessage id={data} /> : data}
        </ChatMessage>
      )}
    </div>
  );
}
