import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface ToggleProps {
  value: string;
  title: string;
  text: string;
  checked: boolean;
}

function Toggle(props: ToggleProps) {
  return (
    <ToggleGroup.Item
      value={props.value}
      title={props.title}
      className={`w-8 h-8 rounded  ${props.checked ? 'bg-violet-500 shadow-center-violet' : 'bg-zinc-900'}`}
    >
      {props.text}
    </ToggleGroup.Item>
  )
}

export default Toggle