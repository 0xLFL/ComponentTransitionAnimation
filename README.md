# ComponentTransitionAnimation

## Getting Started
ComponentTransitionAnimation creates a fade out-in transition animation between components to help create a better user experience

### Example
https://github.com/user-attachments/assets/c9904428-5bba-4d63-a1fc-87effdab5a77


### Prerequisites
- Node.js (>= 16.x)
- npm (or yarn)

### Installation
```shell
npm i component-transition-animation
```

### Usage
```jsx
"use client";

import React from 'react';
import ComponentTransitionAnimation from 'component-transition-animation';
import ProgressDemo from "../ProgressBar/index";
import RegisterEmailStage from "../RegisterEmailStage/index";
import RegisterPasswordStage from "../RegisterPasswordStage/index";
import RegisterSuccess from "../RegisterSuccess/index";
import { useUserRegister } from "@/providers/UserRegisterProvider/index";
import './index.css'

const RegisterPage = () => {
  const {
    currentStage
  } = useUserRegister();

  const registerStages: React.ReactNode[] = [
    <RegisterEmailStage />,
    <RegisterPasswordStage />,
    <RegisterSuccess />,
  ]

  return (
    <>
      <div className='rp-wrapper'>
        <div id='user-register-container' className='rp-form'>
          <h1 className='rp-h1'>Register</h1>
          <ProgressDemo progress={(currentStage / (registerStages.length - 1)) * 100} />
          <ComponentTransitionAnimation
            components={registerStages}
            currentStep={currentStage}
            transitionDuration={1000}
          />
        </div>
      </div>
    </>
  )
}

export default RegisterPage;
```

### Props
| Prop              | Description | Type                                                                 | Required | Defaults to |
|-------------------|----|----------------------------------------------------------------------|----------|-------------|
| components        | Array of components that are having their transtions animated | `React.ReactNode[]`                                                 | No       | `[]`        |
| currentStep       | The index of the component that is currently displayed | `number`                                                            | Yes      | -           |
| transitionDuration| The duration of the transition in milliseconds | `number`                                                            | No       | `1000`       |
| style             | The styles to apply to the wrapper of the displayed component | `React.CSSProperties`                                               | No       | `{}`        |
| containerStyle    | The styles to apply to the container element that holds the components | `React.CSSProperties`                                               | No       | `{}`        |
| animationType     | The type of timing function to apply to the transition (e.g., 'ease', 'ease-in-out', 'linear'), defaults to 'ease-in-out' | `'ease' \| 'linear' \| 'ease-in' \| 'ease-out' \| 'ease-in-out' \| string` | No       | `'ease-in-out'`    |

