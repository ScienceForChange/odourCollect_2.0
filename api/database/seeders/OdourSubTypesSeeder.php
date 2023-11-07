<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\OdourSubType;


class OdourSubTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arraySubTypes = [
            //--------------------------------
            // Waste
            //--------------------------------
            [
                'odour_type_id' => '1',
                'name' => 'Fresh waste',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'Decomposed waste',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'Leachate',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'Biogas',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'Biofilter',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'Ammonia',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'Amines',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'Other',
            ],
            [
                'odour_type_id' => '1',
                'name' => 'I don\'t know',
            ],
            //--------------------------------
            // Waste Water
            //--------------------------------
            [
                'odour_type_id' => '2',
                'name' => 'Waste water',
            ],
            [
                'odour_type_id' => '2',
                'name' => 'Rotten eggs',
            ],
            [
                'odour_type_id' => '2',
                'name' => 'Sludge',
            ],
            [
                'odour_type_id' => '2',
                'name' => 'Chlorine',
            ],
            [
                'odour_type_id' => '2',
                'name' => 'Other',
            ],
            [
                'odour_type_id' => '2',
                'name' => 'I don\'t know',
            ],
            //--------------------------------
            // Agriculture / Livestock
            //--------------------------------
            [
                'odour_type_id' => '3',
                'name' => 'Dead animal',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Cooked meat',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Organic fertilizers (manure/slurry)',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Animal feed',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Cabbage soup',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Rotten eggs',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Ammonia',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Amines',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'Other',
            ],
            [
                'odour_type_id' => '3',
                'name' => 'I don\'t know',
            ],
            //--------------------------------
            // Food Industries
            //--------------------------------
            [
                'odour_type_id' => '4',
                'name' => 'Fat / Oil',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Coffee',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Cocoa',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Milk / Dairy',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Animal food',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Ammonia',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Malt / Hop',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Fish',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Bakeries',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Raw meat',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Ammines',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Cabbage soup',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Rotten eggs',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Bread / Cookies',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Alcohol',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Aroma / Flavour',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'Other',
            ],
            [
                'odour_type_id' => '4',
                'name' => 'I don\'t know',
            ],
            //--------------------------------
            // Industrial
            //--------------------------------
            [
                'odour_type_id' => '5',
                'name' => 'Cabbage soup',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Oil / Petrochemical',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Gas',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Asphalt / Rubber',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Chemical',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Ammonia',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Leather',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Metal',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Plastic',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Sulphur',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Alcohol',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Ketone / Ester / Acetate / Ether',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Amines',
            ],
            [
                'odour_type_id' => '5',
                'name' => 'Glue / Adhesive',
            ],
            //--------------------------------
            // Urban
            //--------------------------------
            [
                'odour_type_id' => '6',
                'name' => 'Urine',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Traffic',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Sewage',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Waste bin',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Waste truck',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Sweat',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Marihuana',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Fresh grass',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Humidity / Wet soil',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Flowers',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Food',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Chimney (burnt wood)',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Paint',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Fuel',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'Other',
            ],
            [
                'odour_type_id' => '6',
                'name' => 'I don\'t know',
            ],
            //--------------------------------
            // Nice
            //--------------------------------
            [
                'odour_type_id' => '7',
                'name' => 'Flowers',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Food',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Bread / Cookies',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Fruit',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Fresh grass',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Forest / Trees / Nature',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Mint / Rosemary / Lavander',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Sea',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Perfume',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Chimney (burnt wood)',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Wood',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'New book',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'Other',
            ],
            [
                'odour_type_id' => '7',
                'name' => 'I don\'t know',
            ],
            //--------------------------------
            // Other
            //--------------------------------
            [
                'odour_type_id' => '8',
                'name' => 'NA',
            ],
            //--------------------------------
            // No Odor
            //--------------------------------
            [
                'odour_type_id' => '9',
                'name' => 'No Odour',
            ],
        ];

        foreach($arraySubTypes as $subType){
            OdourSubType::create($subType);
        }
    }
}
