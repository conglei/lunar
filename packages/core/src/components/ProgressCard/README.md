A card with a progress bar.

```jsx
import ProgressBar from '../ProgressBar';

<ProgressCard title="Upload progress" progress={<ProgressBar percent={66} />} />;
```

With children and a stepped progress bar.

```jsx
import Text from '../Text';
import ProgressBar from '../ProgressBar';
import SteppedProgressBar, { Step } from '../SteppedProgressBar';

<ProgressCard
  title="Upload progress"
  progress={
    <SteppedProgressBar>
      <Step complete />
      <Step />
      <Step />
    </SteppedProgressBar>
  }
>
  <Text>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
      sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
      blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi,
      a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
      Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat.
      Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum.
      Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
    </div>
  </Text>
</ProgressCard>;
```
