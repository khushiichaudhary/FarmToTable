import streamlit as st
import google.generativeai as genai

# Configure the Gemini API
f = open("C:\Users\Khushi\Desktop\New folder\farm_key.txt")
GOOGLE_API_KEY = f.read()

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# Set Streamlit page configuration
st.set_page_config(
    page_title="Gemini Clone",
    page_icon="✨",
    layout="centered"
)





st.markdown(
    "<h1 style='text-align: center; color: #1abc9c;'>Farm to Table</h1>",
    unsafe_allow_html=True
)

# Check for messages in session and create a title if not exists
if "messages" not in st.session_state.keys():
    st.session_state.messages = [
         {"role": "assistant", "content": "**Howdy, this is Gemini and how I can help you today?**","font_size": "24px"}
        
        
    ]
    st.title(":rainbow[Howdy, How may I help you today?]")

# Display all messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])
# Receive user input
user_input = st.chat_input()

# Store user input in session
if user_input is not None:
    st.session_state.messages.append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.write(user_input)
# Generate AI response and display
if st.session_state.messages[-1]["role"] != "assistant":
    with st.chat_message("assistant"):
        with st.spinner("Loading..."):
            ai_response = model.generate_content(user_input)
            st.write(ai_response.text)
    new_ai_message = {"role": "assistant", "content": ai_response.text}
    st.session_state.messages.append(new_ai_message)
