'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CuraWASM } from "cura-wasm-tkml";
import { resolveDefinition } from "cura-wasm-definitions";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const time = new Date();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setProgress(0);
    
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (!event.target?.result) return;
        
        const fileContent = event.target.result as ArrayBuffer;


        const commandParts = [
          'slice -j definitions/fdmprinter.def.json -o Model.gcode',
          '-s layer_height=0.2',
          '-s retraction_speed=30',
          '-s machine_width=200',
          '-s machine_height=200',
          '-s machine_depth=200',
          '-s speed_travel=80',
          '-s bridge_settings_enabled=false',
          '-s speed_infill=60',
          '-s infill_pattern=lines',
          '-s infill_line_width=0.4',
          '-s infill_line_distance=0.4',
          '-s bottom_layers=3',
          '-s top_layers=3',
          '-s retraction_amount=1',
          '-s wipe_retraction_enable=false',
          '-s material_print_temperature=190',
          '-s cool_min_speed=12',
          '-s cool_min_layer_time=15',
          '-s material_print_temperature_layer_0=190',
          '-s material_final_print_temperature=190',
          '-s speed_wall_0=30',
          '-s speed_topbottom=48',
          '-s speed_wall_x=60',
          '-s adhesion_type=skirt',
          '-s skirt_line_count=2',
          '-s skirt_gap=4',
          '-s outer_inset_first=true',
          '-s infill_sparse_thickness=0.2',
          '-s layer_height_0=0.18',
          '-s wall_x_material_flow=90',
          '-s infill_material_flow=90',
          '-s material_flow=90',
          '-s speed_z_hop=16.67',
          '-s speed_travel_layer_0=80',
          '-s infill_overlap_mm=0.06',
          '-s skirt_brim_speed=60',
          '-s retraction_combing=noskin',
          '-s retraction_retract_speed=30',
          '-s retraction_prime_speed=30',
          '-s retract_at_layer_change=true',
          '-s retraction_min_travel=0',
          '-s wall_x_material_flow_layer_0=90',
          '-s wall_0_material_flow_layer_0=90',
          '-s default_material_print_temperature=190',
          '-s machine_heated_bed=true',
          '-s machine_max_feedrate_x=80',
          '-s machine_max_feedrate_y=80',
          '-l Model.stl'
        ];
        
        // Create a new slicer with configuration
        const slicer = new CuraWASM({
          // Enable verbose logging for debugging
          verbose: true,
          command: commandParts.join(' '),
          // definition:resolveDefinition('fdmprinter'),
          
          // Transfer the input file to the worker thread
          transfer: true,

          // first :command: 'slice -j definitions/fdmprinter.def.json -o Model.gcode -s layer_height=0.2 -s speed_travel=80 -s bridge_settings_enabled=false -s speed_infill=60 -s infill_pattern=lines -s infill_line_width=0.4 -s infill_line_distance=0.4 -s bottom_layers=3 -s top_layers=3 -s retraction_amount=1 -s wipe_retraction_enable=false -s material_print_temperature=190 -s cool_min_speed=12 -s cool_min_layer_time=15 -s material_print_temperature_layer_0=190 -s material_final_print_temperature=190 -s speed_wall_0=50 -s speed_topbottom=48 -s adhesion_type=skirt -s skirt_line_count=2 -s skirt_gap=4 -l Model.stl',

          // second: command: 'slice -j definitions/fdmprinter.def.json -o Model.gcode -s layer_height=0.2 -s retraction_speed=30 -s machine_width=200 -s machine_height=200 -s machine_depth=200 -s speed_travel=80 -s bridge_settings_enabled=false -s speed_infill=60 -s infill_pattern=lines -s infill_line_width=0.4 -s infill_line_distance=0.4 -s bottom_layers=3 -s top_layers=3 -s retraction_amount=1 -s wipe_retraction_enable=false -s material_print_temperature=190 -s cool_min_speed=12 -s cool_min_layer_time=15 -s material_print_temperature_layer_0=190 -s material_final_print_temperature=190 -s speed_wall_0=30 -s speed_topbottom=48 -s speed_wall_x=30 -s adhesion_type=skirt -s skirt_line_count=2 -s skirt_gap=4 -s outer_inset_first=true -l Model.stl',
          
          // third: command: 'slice -j definitions/fdmprinter.def.json -o Model.gcode -s layer_height=0.2 -s retraction_speed=3000 -s machine_width=200 -s machine_height=200 -s machine_depth=200 -s speed_travel=80 -s bridge_settings_enabled=false -s speed_infill=60 -s infill_pattern=lines -s infill_line_width=0.4 -s infill_line_distance=0.4 -s bottom_layers=3 -s top_layers=3 -s retraction_amount=1 -s wipe_retraction_enable=false -s material_print_temperature=190 -s cool_min_speed=12 -s cool_min_layer_time=15 -s material_print_temperature_layer_0=190 -s material_final_print_temperature=190 -s speed_wall_0=30 -s speed_topbottom=48 -s speed_wall_x=60 -s adhesion_type=skirt -s skirt_line_count=2 -s skirt_gap=4 -s outer_inset_first=true -s infill_sparse_thickness=0.2 -s layer_height_0=0.18 -s wall_x_material_flow=90 -s infill_material_flow=90 -s material_flow=90 -s speed_z_hop=16.6 -s speed_travel_layer_0=80 -s infill_overlap_mm=0.06 -s skirt_brim_speed=60 -s retraction_combing=noskin -s retraction_retract_speed=30 -s retraction_prime_speed=30 -s retract_at_layer_change=true -s retraction_min_travel=0 -l Model.stl',

          // forth: command: 'slice -j definitions/fdmprinter.def.json -o Model.gcode -s layer_height=0.2 -s retraction_speed=30 -s machine_width=200 -s machine_height=200 -s machine_depth=200 -s speed_travel=80 -s bridge_settings_enabled=false -s speed_infill=60 -s infill_pattern=lines -s infill_line_width=0.4 -s infill_line_distance=0.4 -s bottom_layers=3 -s top_layers=3 -s retraction_amount=1 -s wipe_retraction_enable=false -s material_print_temperature=190 -s cool_min_speed=12 -s cool_min_layer_time=15 -s material_print_temperature_layer_0=190 -s material_final_print_temperature=190 -s speed_wall_0=30 -s speed_topbottom=48 -s speed_wall_x=60 -s adhesion_type=skirt -s skirt_line_count=2 -s skirt_gap=4 -s outer_inset_first=true -s infill_sparse_thickness=0.2 -s layer_height_0=0.18 -s wall_x_material_flow=90 -s infill_material_flow=90 -s material_flow=90 -s speed_z_hop=16.67 -s speed_travel_layer_0=80 -s infill_overlap_mm=0.06 -s skirt_brim_speed=60 -s retraction_combing=noskin -s retraction_retract_speed=30 -s retraction_prime_speed=30 -s retract_at_layer_change=true -s retraction_min_travel=0 -s wall_x_material_flow_layer_0=90 -s wall_0_material_flow_layer_0=90 -s default_material_print_temperature=190 -s machine_heated_bed=true -s machine_max_feedrate_x=80 -s machine_max_feedrate_y=80 -l Model.stl',
          
          // fifth: command: 'slice -j definitions/fdmprinter.def.json -o Model.gcode -s layer_height=0.2 -s retraction_speed=30 -s machine_width=200 -s machine_height=200 -s machine_depth=200 -s speed_travel=80 -s bridge_settings_enabled=false -s speed_infill=60 -s infill_pattern=lines -s infill_line_width=0.4 -s infill_line_distance=0.4 -s bottom_layers=3 -s top_layers=3 -s retraction_amount=1 -s wipe_retraction_enable=false -s material_print_temperature=190 -s cool_min_speed=12 -s cool_min_layer_time=15 -s material_print_temperature_layer_0=190 -s material_final_print_temperature=190 -s speed_wall_0=30 -s speed_topbottom=48 -s speed_wall_x=60 -s adhesion_type=skirt -s skirt_line_count=2 -s skirt_gap=4 -s outer_inset_first=true -s infill_sparse_thickness=0.2 -s layer_height_0=0.18 -s wall_x_material_flow=90 -s infill_material_flow=90 -s material_flow=90 -s speed_z_hop=16.67 -s speed_travel_layer_0=80 -s infill_overlap_mm=0.06 -s skirt_brim_speed=60 -s retraction_combing=noskin -s retraction_retract_speed=30 -s retraction_prime_speed=30 -s retract_at_layer_change=true -s retraction_min_travel=0 -s wall_x_material_flow_layer_0=90 -s wall_0_material_flow_layer_0=90 -s default_material_print_temperature=190 -s machine_heated_bed=true -s machine_max_feedrate_x=80 -s machine_max_feedrate_y=80 -l Model.stl',
          
          // Override settings for the current 3D printer definition
          // overrides: [
          //   {
          //     scope: 'e0',
          //     key: 'infill_pattern',
          //     value: 'grid'
          //   },
          //   {
          //     scope:'e0',
          //     key:'speed_travel',
          //     value:'80'
          //   },
          //   {
          //     scope:'e0',
          //     key:'speed_print_layer_0',
          //     value:'30'
          //   },
          //   {
          //     scope:'e0',
          //     key:'speed_infill',
          //     value:'60'
          //   },
          //   {
          //     scope:'e0',
          //     key:'retraction_min_travel',
          //     value:'3'
          //   },
          //   {
          //     scope:'e0',
          //     key:'layer_height',
          //     value:'0.2'
          //   },
          //   {
          //     scope:'e0',
          //     key:'speed_support_infill',
          //     value:'48'
          //   },
          //   // {
          //   //   scope:'e0',
          //   //   key:'machine_depth',
          //   //   value:'200'
          //   // },
          //   // {
          //   //   scope:'e0',
          //   //   key:'machine_width',
          //   //   value:'200'
          //   // },
          //   // {
          //   //   scope:'e0',
          //   //   key:'machine_height',
          //   //   value:'200'
          //   // },
          //   {
          //     scope:'e0',
          //     key:'speed_wall',
          //     value:'3000'
          //   },
          //   {
          //     scope:'e0',
          //     key:'cool_min_layer_time_fan_speed_max',
          //     value:'45'
          //   },
          //   {
          //     scope:'e0',
          //     key:'retraction_min_travel',
          //     value:'3'
          //   },
          //   {
          //     scope:'e0',
          //     key:'adhesion_type',
          //     value:'skirt'
          //   },
          //   {
          //     scope:'e0',
          //     key:'skirt_brim_speed',
          //     value:'30'
          //   },
          //   {
          //     scope:'e0',
          //     key:'wall_line_count',
          //     value:'2'
          //   },
          //   {
          //     scope:'e0',
          //     key:'support_top_distance',
          //     value:'0.4'
          //   },
          //   {
          //     scope:'e0',
          //     key:'cool_min_layer_time_fan_speed_max',
          //     value:'45'
          //   },
          //   {
          //     scope:'e0',
          //     key:'cool_min_layer_time',
          //     value:'15'
          //   },
          //   {
          //     scope:'e0',
          //     key:'retraction_enable',
          //     value:'true'
          //   },
          //   {
          //     scope:'e0',
          //     key:'infill_sparse_density',
          //     value:'77'
          //   },
          //   {
          //     scope:'e0',
          //     key:'skirt_brim_material_flow',
          //     value:'90'
          //   },
          //   {
          //     scope: 'e0',
          //     key: 'infill_line_distance',
          //     value: '0.52'
          //   },
          //   {
          //     scope: 'e0',
          //     key: 'infill_line_width',
          //     value: '0.4'
          //   },
          // ]
        });
        
        // Set up progress logger
        slicer.on('progress', (percent: number) => {
          setProgress(percent);
          console.log(`Progress: ${percent}%`);
        });
        
        // Determine file extension
        const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase() || 'stl';
        
        // Slice the model
        const { gcode, metadata } = await slicer.slice(fileContent, fileExtension);
        
        // Display the results
        setResult(JSON.stringify({
          metadata,
          gcodeSize: gcode.byteLength,
          gcodePreview: new TextDecoder().decode(gcode.slice(0, 1000)) + '...'
        }, null, 2));
      };
      reader.readAsArrayBuffer(uploadedFile);
    } catch (error) {
      console.error("Error processing file:", error);
      setResult("Error processing file: " + (error as Error).message);
    }
  };
console.log(result)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-4">
        {/* <p>Current time: {time.toString()}</p> */}
        
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".stl,.3mf,.amf,.ply,.obj"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
          
          {file && (
            <p className="text-sm text-gray-600">
              Selected file: {file.name}
            </p>
          )}
          
          {progress > 0 && progress < 100 && (
            <div className="w-full max-w-xs mt-2">
              <div className="bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-center mt-1">Processing: {progress.toFixed(1)}%</p>
            </div>
          )}
          
          {/* {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <pre className="text-sm overflow-auto max-h-60">
                {result}
              </pre>
            </div>
          )} */}
        </div>

        <Link href="/dynamic" className="mt-4 text-blue-500 hover:text-blue-700">
          Link to dynamic page
        </Link>
      </div>
    </div>
  );





  // {
  //   "metadata": {
  //     "flavor": "Marlin",
  //     "printTime": 73715, 73143
  //     "material1Usage": 143209,
  //     "material2Usage": 0,
  //     "nozzleSize": 0.4,
  //     "filamentUsage": 143209
  //   },
  //   "gcodeSize": 13385357,
  //   "gcodePreview": ";FLAVOR:Marlin\n;TIME:6666\n;Filament used: 0m\n;Layer height: 0.1\n;MINX:2.14748e+06\n;MINY:2.14748e+06\n;MINZ:2.14748e+06\n;MAXX:-2.14748e+06\n;MAXY:-2.14748e+06\n;MAXZ:-2.14748e+06\n\n;Generated with Cura_SteamEngine master\nM104 S215\nM105\nM109 S215\nM82 ;absolute extrusion mode\nG28 ;Home\nG1 Z15.0 F6000 ;Move the platform down 15mm\n;Prime the extruder\nG92 E0\nG1 F200 E3\nG92 E0\nG92 E0\nG92 E0\nG1 F1500 E-6.5\n;LAYER_COUNT:998\n;LAYER:0\nM107\nG0 F3600 X44.623 Y44.349 Z0.3\n;TYPE:SKIRT\nG1 F1500 E0\nG1 F1800 X45.222 Y43.834 E0.01486\nG1 X45.87 Y43.383 E0.02971\nG1 X46.561 Y42.999 E0.04458\nG1 X47.286 Y42.687 E0.05943\nG1 X48.039 Y42.45 E0.07428\nG1 X48.813 Y42.291 E0.08914\nG1 X49.598 Y42.21 E0.10398\nG1 X50 Y42.2 E0.11155\nG1 X150 Y42.2 E1.9926\nG1 X150.789 Y42.24 E2.00747\nG1 X151.569 Y42.359 E2.02231\nG1 X152.334 Y42.557 E2.03717\nG1 X153.074 Y42.831 E2.05202\nG1 X153.783 Y43.179 E2.06687\nG1 X154.454 Y43.597 E2.08174\nG1 X155.078 Y44.08 E2.09659\nG1 X155.651 Y44.623 E2.11143\nG1 X156.166 Y45.222 E2.12629\nG1 X156.617 Y45..."
  // }




  // {
  //   "metadata": {
  //     "flavor": "Marlin",
  //     "printTime": 73715,
  //     "material1Usage": 143209,
  //     "material2Usage": 0,
  //     "nozzleSize": 0.4,
  //     "filamentUsage": 143209  mm^3
  //   },
  //   "gcodeSize": 13385357,
  //   "gcodePreview": ";FLAVOR:Marlin\n;TIME:6666\n;Filament used: 0m\n;Layer height: 0.1\n;MINX:2.14748e+06\n;MINY:2.14748e+06\n;MINZ:2.14748e+06\n;MAXX:-2.14748e+06\n;MAXY:-2.14748e+06\n;MAXZ:-2.14748e+06\n\n;Generated with Cura_SteamEngine master\nM104 S215\nM105\nM109 S215\nM82 ;absolute extrusion mode\nG28 ;Home\nG1 Z15.0 F6000 ;Move the platform down 15mm\n;Prime the extruder\nG92 E0\nG1 F200 E3\nG92 E0\nG92 E0\nG92 E0\nG1 F1500 E-6.5\n;LAYER_COUNT:998\n;LAYER:0\nM107\nG0 F3600 X44.623 Y44.349 Z0.3\n;TYPE:SKIRT\nG1 F1500 E0\nG1 F1800 X45.222 Y43.834 E0.01486\nG1 X45.87 Y43.383 E0.02971\nG1 X46.561 Y42.999 E0.04458\nG1 X47.286 Y42.687 E0.05943\nG1 X48.039 Y42.45 E0.07428\nG1 X48.813 Y42.291 E0.08914\nG1 X49.598 Y42.21 E0.10398\nG1 X50 Y42.2 E0.11155\nG1 X150 Y42.2 E1.9926\nG1 X150.789 Y42.24 E2.00747\nG1 X151.569 Y42.359 E2.02231\nG1 X152.334 Y42.557 E2.03717\nG1 X153.074 Y42.831 E2.05202\nG1 X153.783 Y43.179 E2.06687\nG1 X154.454 Y43.597 E2.08174\nG1 X155.078 Y44.08 E2.09659\nG1 X155.651 Y44.623 E2.11143\nG1 X156.166 Y45.222 E2.12629\nG1 X156.617 Y45..."
  // }

  // {
  //   "metadata": {
  //     "flavor": "Marlin",
  //     "printTime": 24285,
  //     "material1Usage": 467853,
  //     "material2Usage": 0,
  //     "nozzleSize": 0.4,
  //     "filamentUsage": 467853
  //   },
  //   "gcodeSize": 4992475,
  //   "gcodePreview": ";FLAVOR:Marlin\n;TIME:6666\n;Filament used: 0m\n;Layer height: 0.1\n;MINX:2.14748e+06\n;MINY:2.14748e+06\n;MINZ:2.14748e+06\n;MAXX:-2.14748e+06\n;MAXY:-2.14748e+06\n;MAXZ:-2.14748e+06\n\n;Generated with Cura_SteamEngine master\nM104 S215\nM105\nM109 S215\nM82 ;absolute extrusion mode\nG28 ;Home\nG1 Z15.0 F6000 ;Move the platform down 15mm\n;Prime the extruder\nG92 E0\nG1 F200 E3\nG92 E0\nG92 E0\nG92 E0\nG1 F1500 E-6.5\n;LAYER_COUNT:998\n;LAYER:0\nM107\nG0 F3600 X44.623 Y44.349 Z0.3\n;TYPE:SKIRT\nG1 F1500 E0\nG1 F1800 X45.222 Y43.834 E0.01486\nG1 X45.87 Y43.383 E0.02971\nG1 X46.561 Y42.999 E0.04458\nG1 X47.286 Y42.687 E0.05943\nG1 X48.039 Y42.45 E0.07428\nG1 X48.813 Y42.291 E0.08914\nG1 X49.598 Y42.21 E0.10398\nG1 X50 Y42.2 E0.11155\nG1 X150 Y42.2 E1.9926\nG1 X150.789 Y42.24 E2.00747\nG1 X151.569 Y42.359 E2.02231\nG1 X152.334 Y42.557 E2.03717\nG1 X153.074 Y42.831 E2.05202\nG1 X153.783 Y43.179 E2.06687\nG1 X154.454 Y43.597 E2.08174\nG1 X155.078 Y44.08 E2.09659\nG1 X155.651 Y44.623 E2.11143\nG1 X156.166 Y45.222 E2.12629\nG1 X156.617 Y45..."
  // }
}


// works
// speed_print_layer_0
// speed_travel
// speed_infill
// infill_line_distance
// infill_line_width
// bridge_settings_enabled
// support_enable if true the speed_support_infill is used
// infill_sparse_thickness = layer_height * infillLayerInterval
// infill_overlap_mm = 15% of layer_width or nozzle_diameter
// layer_height_0 = layer_height * 90%
// density = infill_line_w / infill_line_distance == > infill_line_w / [0 to 1] = infill_line_distance
