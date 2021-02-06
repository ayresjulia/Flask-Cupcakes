const BASE_URL = 'http://localhost:5000/api';

function generateCupcakeHTML(cupcake) {
	return `
    <div data-cupcake-id=${cupcake.id}  id='li-div'>  
      <img class="cupcake-img"
            src="${cupcake.image}">
            <li>
        ${cupcake.flavor} <i>(${cupcake.size}, rated ${cupcake.rating})</i>
        <button class="delete-button btn btn-danger"><i class="fas fa-trash-alt"></i></button>
      </li>
      
    </div>
  `;
}

async function showInitialCupcakes() {
	const response = await axios.get(`${BASE_URL}/cupcakes`);

	for (let cupcakeData of response.data.cupcakes) {
		let newCupcake = $(generateCupcakeHTML(cupcakeData));
		$('#cupcakes-list').append(newCupcake);
	}
}

$('#cupcake-form').on('submit', addCupcake);

$('#cupcakes-list').on('click', '.delete-button', deleteCupcake);

async function addCupcake(evt) {
	evt.preventDefault();

	let flavor = $('#flavor').val();
	let rating = $('#rating').val();
	let size = $('#size').val();
	let image = $('#image').val();

	const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
		flavor,
		rating,
		size,
		image
	});

	let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
	$('#cupcakes-list').append(newCupcake);
	$('#cupcake-form').trigger('reset');
}

async function deleteCupcake(evt) {
	evt.preventDefault();
	let $cupcake = $(evt.target).closest('div');
	let cupcakeId = $cupcake.attr('data-cupcake-id');

	await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
	$cupcake.remove();
}

$(showInitialCupcakes);
