/*Exercise 2: Creating a React Component with TypeScript
Create a new Greeting.tsx component file
Define an interface for props including name and messageCount
Create the component using the defined props
Implement the component in App.tsx
Success Criteria:
Component compiles without TypeScript errors
Props are properly typed and enforced
Component renders correctly with provided props*/

import React from 'react';

interface GreetingProps {
    name: string;
    messageCount: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>You have {messageCount} new messages.</p>
        </div>
    );
};


export default Greeting;