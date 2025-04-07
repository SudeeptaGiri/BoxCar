export interface Car {
    name: string;
    image: string;
    description: string;
    mileage: string;
    fuel_type: string;
    transmission: string;
    price: string;
  }
  
  export interface CarListItem {
    name: string;
    price: string;
    element: HTMLElement;
  }
  
  export interface CarData {
    make: string;
    model: string;
  }
  
  export interface Comment {
    name: string;
    profession: string;
    text: string;
  }
  
  export interface BlogPost {
    author: string;
    date: string;
    image: string;
    text: string;
  }
  
  export interface ChatMessage {
    role: 'user' | 'system' | 'bot';
    content: string;
  }