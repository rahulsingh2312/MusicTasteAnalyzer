import tensorflow as tf
from transformers import GPT2Tokenizer, TFGPT2LMHeadModel

# Load your data and perform necessary preprocessing steps (tokenization, formatting).

# Instantiate the tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = TFGPT2LMHeadModel.from_pretrained('gpt2')

file_path = 'tshate.json'

# Check if the file already exists
if os.path.exists(file_path):
    # Read existing JSON data from the file
    with open(file_path, 'r') as json_file:
        existing_comments_json = json_file.read()



# Tokenize your input text and convert to model input format
input_ids = tokenizer.encode(existing_comments_json, return_tensors='tf')

# Fine-tune the model (example using TensorFlow)
optimizer = tf.keras.optimizers.Adam(learning_rate=5e-5)
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
model.compile(optimizer=optimizer, loss=[loss])

# Train the model
model.fit(input_ids, labels=input_ids, epochs=1)

# Save the fine-tuned model
save_path = 'fine_tuned_gpt2'
model.save_pretrained(save_path)
tokenizer.save_pretrained(save_path)

loaded_model = TFGPT2LMHeadModel.from_pretrained('fine_tuned_gpt2')
loaded_tokenizer = GPT2Tokenizer.from_pretrained('fine_tuned_gpt2')
