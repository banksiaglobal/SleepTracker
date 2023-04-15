import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SpinnerViewComponent } from './spinner-view.component';

export default {
  title: 'Components/Spinner',
  component: SpinnerViewComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [],
    }),
  ],
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story = args => ({
  props: args,
});
export const Primary = Template.bind({});
Primary.args = {
  loading: true,
};
