// WrapperComponent.tsx
import React, { ComponentType, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ChatMessage } from "./ChatMessage";
import { ConfirmButton } from "./ConfirmButton";

export type ConfirmComponentProps<TProps = unknown> = {
  setData: React.Dispatch<React.SetStateAction<string>>;
  isAfterConfirmState: boolean;
} & TProps;

type ConfirmComponentWrapperProps<TProps = unknown> = {
  ContentComponent: ComponentType<ConfirmComponentProps<TProps>>;
  componentProps: TProps;
  defaultValue: string;
  onConfirmButtonClicked: (data: string) => void;
  shouldLocalizeData: boolean;
} & React.HTMLProps<HTMLDivElement>;

export function ConfirmComponentWrapper<TProps>({
  ContentComponent,
  defaultValue,
  onConfirmButtonClicked,
  shouldLocalizeData,
  componentProps,
}: ConfirmComponentWrapperProps<TProps>) {
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
          {...componentProps}
        />
      </ChatMessage>
      {!isAfterConfirmState && data && (
        <ConfirmButton
          position="start"
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
