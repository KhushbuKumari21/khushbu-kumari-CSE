// Get the draggable items and drop container
const dragItems = document.querySelectorAll('.drag-item');
const dropContainer = document.getElementById('drop-container');
const resetButton = document.getElementById('resetButton');
const successMessage = document.createElement('p');
successMessage.className = 'success-message';

// Store the original parent and position of each draggable item
const originalParents = Array.from(dragItems).map(item => item.parentNode);
const originalPositions = Array.from(dragItems).map(item => item.getBoundingClientRect());

// Add event listeners to draggable items
dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Add event listeners to drop container
dropContainer.addEventListener('dragover', dragOver);
dropContainer.addEventListener('dragenter', dragEnter);
dropContainer.addEventListener('dragleave', dragLeave);
dropContainer.addEventListener('drop', drop);

// Drag functions
function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.target.classList.add('dragging');
}

function dragEnd(event) {
  event.target.classList.remove('dragging');
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.target.classList.add('dragover');
}

function dragLeave(event) {
  event.target.classList.remove('dragover');
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData('text/plain');
  const item = document.getElementById(itemId);
  event.target.appendChild(item);
  event.target.appendChild(successMessage);
  successMessage.innerText = 'Item dropped!';
  event.target.classList.remove('dragover');
}

// Reset function
resetButton.addEventListener('click', () => {
  // Remove dropped items from the second container
  const droppedItems = Array.from(dropContainer.children).filter(child => child !== successMessage);
  droppedItems.forEach(item => {
    item.remove();
  });

  // Reset the first container to its original state
  dragItems.forEach((item, index) => {
    const originalParent = originalParents[index];
    const originalPosition = originalPositions[index];
    item.style.left = originalPosition.left + 'px';
    item.style.top = originalPosition.top + 'px';
    originalParent.appendChild(item);
  });

  // Clear the success message
  successMessage.innerText = '';

  // Remove the reset message if present
  if (dropContainer.lastChild.classList.contains('reset-message')) {
    dropContainer.lastChild.remove();
  }
});
